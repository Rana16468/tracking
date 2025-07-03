import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import {
  TWeatherResponse,
  WeatherResponse,
} from './weather_analysis.interface';
import WeatherModel from './weather_analysis.model';

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

const weather_analysis_services = {
  recorded_wather_info_intodb,
};
export default weather_analysis_services;
