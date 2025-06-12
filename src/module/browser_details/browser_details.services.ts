import httpStatus from 'http-status';
import NodeCache from 'node-cache';
import mongoose from 'mongoose';
import ApiError from '../../app/error/ApiError';
import {
  BrowserDetailsResponse,
  TBrowserDetails,
} from './browser_details.interface';
import timezones from '../tracking/tracking.model';
import browserdetails from './browser_details.model';

const cache = new NodeCache({ stdTTL: 60 * 60 });

const createDetailsIntoDb = async (
  payload: TBrowserDetails,
): Promise<BrowserDetailsResponse> => {
  try {
    const visitorId = payload.visitorId.trim();
    const cacheKey = `timezone:${visitorId}`;

    let timeZoneId = cache.get<string>(cacheKey);

    if (!timeZoneId) {
      const existingTZ = await timezones.findOne({
        visitorId,
        isDelete: false,
      });

      if (!existingTZ) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Time zone not found', '');
      }

      timeZoneId = existingTZ._id.toString();
      cache.set(cacheKey, timeZoneId);
    }

    payload.timeZoneId = new mongoose.Types.ObjectId(timeZoneId);

    const result = await browserdetails.findOneAndUpdate(
      { visitorId, isDelete: false },
      { $set: payload },
      { new: true, upsert: true },
    );

    if (!result) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        'Failed to record browser details',
        '',
      );
    }

    return {
      status: true,
      message: 'Successfully recorded',
    };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in createDetailsIntoDb',
      error?.message || error,
    );
  }
};

export default {
  createDetailsIntoDb,
};
