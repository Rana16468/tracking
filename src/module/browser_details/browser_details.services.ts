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
import QueryBuilder from '../../app/builder/QueryBuilder';

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

const findByAllbrowserdetailsIntoDb = async (
  query: Record<string, unknown>,
) => {
  try {
    const browserdetailsQuery = new QueryBuilder(
      browserdetails.find({ isDelete: false }),
      query,
    )
      .search(['visitorId',"_id","timezone","platform"])
      .filter()
      .sort()
      .paginate()
      .fields();
    const all_browserdetails = await browserdetailsQuery.modelQuery;
    const meta = await browserdetailsQuery.countTotal();

    return { meta, all_browserdetails };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error findByAllDeviceInfoIntoDb',
      error?.message || error,
    );
  }
};

const find_by_specific_browser_details_IntoDb = async (id: string) => {
  try {
    const result = await browserdetails
      .findById(id)
      .select('-updatedAt -createdAt');
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'not founded', '');
    }
    return result;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error findByAllDeviceInfoIntoDb',
      error?.message || error,
    );
  }
};

const delete_browser_details_IntoDb = async (id: string) => {
  try {
    const result = await browserdetails.findByIdAndDelete(id);
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
      'Error delete_browser_details_IntoDb',
      error?.message || error,
    );
  }
};

export default {
  createDetailsIntoDb,
  findByAllbrowserdetailsIntoDb,
  find_by_specific_browser_details_IntoDb,
  delete_browser_details_IntoDb,
};
