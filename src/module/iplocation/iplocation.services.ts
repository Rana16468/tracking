import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import { TIplocation, IplocationResponse } from './iplocation.interface';
import IplocationModel from './iplocation.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import iplocations from './iplocation.model';

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

const findByAllIplocationtoDb = async (query: Record<string, unknown>) => {
  try {
    const iplocationsQuery = new QueryBuilder(
      iplocations.find({ isDelete: false }),
      query,
    )
      .search([])
      .filter()
      .sort()
      .paginate()
      .fields();
    const all_iplocations = await iplocationsQuery.modelQuery;
    const meta = await iplocationsQuery.countTotal();

    return { meta, all_iplocations };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error find By All Iplocation toDb',
      error?.message || error,
    );
  }
};

const specificFindByIpLocationIntoDb = async (id: string) => {
  try {
    return await iplocations.findById(id).select('-updatedAt -createdAt');
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error find By All Iplocation toDb',
      error?.message || error,
    );
  }
};

const delete_iplocations_IntoDb = async (id: string) => {
  try {
    const result = await iplocations.findByIdAndDelete(id);
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
      'Error delete_iplocations_IntoDb',
      error?.message || error,
    );
  }
};

const iplocation_services = {
  recordIpLocationIntoDb,
  findByAllIplocationtoDb,
  delete_iplocations_IntoDb,
  specificFindByIpLocationIntoDb,
};

export default iplocation_services;
