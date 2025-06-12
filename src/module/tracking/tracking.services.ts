import httpStatus from 'http-status';
import NodeCache from 'node-cache';
import ApiError from '../../app/error/ApiError';
import timezones from './tracking.model';
import { TimeZoneResponse, TTimeZone } from './tracking.interface';

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

const TimeZoneServices = {
  createTimeZoneIntoDb,
};

export default TimeZoneServices;
