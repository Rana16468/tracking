import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import { TIplocation, IplocationResponse } from './iplocation.interface';
import IplocationModel from './iplocation.model';

export async function recordIpLocationIntoDb(
  payload: TIplocation,
): Promise<IplocationResponse> {
  try {
    const { visitorId, city, region, country, lat, lon, service, isDelete } =
      payload;

    const updated = await IplocationModel.findOneAndUpdate(
      { visitorId, isDelete: false },
      { visitorId, city, region, country, lat, lon, service, isDelete },
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
        'Failed to record IP location',
        '',
      );
    }

    return { status: true, message: 'IP location recorded successfully' };
  } catch (err: any) {
    if (err instanceof ApiError) throw err;

    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in recordIpLocation service',
      err.message,
    );
  }
}

const iplocation_services = {
  recordIpLocationIntoDb,
};

export default iplocation_services;
