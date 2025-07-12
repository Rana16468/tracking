import httpStatus from 'http-status';
import NodeCache from 'node-cache';
import ApiError from '../../app/error/ApiError';
import timezones from './tracking.model';
import { TimeZoneResponse, TTimeZone } from './tracking.interface';
import QueryBuilder from '../../app/builder/QueryBuilder';

const timeZoneCache = new NodeCache({ stdTTL: 60 * 60 });
const createTimeZoneIntoDb = async (
  payload: TTimeZone,
): Promise<TimeZoneResponse> => {
  try {
    const cacheKey = `timezone:${payload.visitorId}`;

    const cachedResult = timeZoneCache.get<TimeZoneResponse>(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    const timeZone = await timezones.findOneAndUpdate(
      { visitorId: payload.visitorId, isDelete: false },
      { $set: payload },
      { new: true, upsert: true },
    );

    if (!timeZone) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        'Failed to create or update timezone record.',
        '',
      );
    }

    const response: TimeZoneResponse = {
      status: true,
      message: 'Timezone successfully recorded',
    };

    timeZoneCache.set(cacheKey, response);

    return response;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error occurred while recording timezone.',
      error?.message || error,
    );
  }
};

const findByAllTimeZoneIntoDb = async (query: Record<string, unknown>) => {
  try {
    const specificUserResaleHistoryQuery = new QueryBuilder(
      timezones.find({ isDelete: false }),

      query,
    )
      .search(['visitorId','_id'])
      .filter()
      .sort()
      .paginate()
      .fields();
    const all_resale_history = await specificUserResaleHistoryQuery.modelQuery;
    const meta = await specificUserResaleHistoryQuery.countTotal();

    return { meta, all_resale_history };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error find By All TimeZone',
      error?.message || error,
    );
  }
};

const delete_timezones_IntoDb = async (id: string) => {
  try {
    const result = await timezones.findByIdAndDelete(id);
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
      'Error delete_timezones_IntoDb',
      error?.message || error,
    );
  }
};


const find_by_specific_timezones_IntoDb=async(id:string)=>{

    try{

       return await timezones.findById(id);


    }
    catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error find_by_specific_timezones_IntoDb',
      error?.message || error,
    );
  }
}

const TimeZoneServices = {
  createTimeZoneIntoDb,
  findByAllTimeZoneIntoDb,
  delete_timezones_IntoDb,
  find_by_specific_timezones_IntoDb
};

export default TimeZoneServices;
