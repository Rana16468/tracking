import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import {
  TWeatherResponse,
  WeatherResponse,
} from './weather_analysis.interface';
import WeatherModel from './weather_analysis.model';
import ipweathers from './weather_analysis.model';
import QueryBuilder from '../../app/builder/QueryBuilder';

async function recorded_wather_info_intodb(
  payload: TWeatherResponse,
): Promise<WeatherResponse> {
  try {
    const { visitorId, location, current } = payload;

    const updated = await WeatherModel.findOneAndUpdate(
      { visitorId, isDelete: false },
      { visitorId, location, current },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    )
      .lean()
      .exec();

    if (!updated) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to record weather data',
        '',
      );
    }

    return { status: true, message: 'Weather data recorded successfully' };
  } catch (err: any) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in recordWeatherInfo service',
      err.message,
    );
  }
}

const findByAllWeatherAanlysistoDb = async (query: Record<string, unknown>) => {
  try {
    const weatherAnalysisQuery = new QueryBuilder(
      ipweathers.find({ isDelete: false }),
      query,
    )
      .search([
        'visitorId',
        'location.name',
        'location.region',
        'location.country',
        'location.tz_id',
      ])
      .filter()
      .sort()
      .paginate()
      .fields();
    const all_weather_analysis = await weatherAnalysisQuery.modelQuery;
    const meta = await weatherAnalysisQuery.countTotal();

    return { meta, all_weather_analysis };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error findByAllWeatherAanlysistoDb ',
      error?.message || error,
    );
  }
};

const delete_weather_anlysis_IntoDb = async (id: string) => {
  try {
    const result = await ipweathers.findByIdAndDelete(id);
    if (!result) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        'issues by the delete section',
        '',
      );
    }
    return { status: true, message: 'successfully  delete' };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error  delete_weather_anlysis_IntoDb',
      error?.message || error,
    );
  }
};

const find_by_specific_weather_analysis_IntoDb = async (id: string) => {
  try {
    return await ipweathers.findById(id);
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error  find_by_specific_weather_analysis',
      error?.message || error,
    );
  }
};

const weather_analysis_services = {
  recorded_wather_info_intodb,
  findByAllWeatherAanlysistoDb,
  delete_weather_anlysis_IntoDb,
  find_by_specific_weather_analysis_IntoDb,
};
export default weather_analysis_services;
