import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import { DeviceInfoResponse, TDeviceInfo } from './device_info.interface';
import deviceInfos from './device_info.model';
import QueryBuilder from '../../app/builder/QueryBuilder';

const recorded_device_Info_IntoDb = async (
  payload: TDeviceInfo,
): Promise<DeviceInfoResponse> => {
  try {
    const result = await deviceInfos.findOneAndUpdate(
      { visitorId: payload?.visitorId, isDelete: false },
      { $set: payload },
      { new: true, upsert: true },
    );
    if (!result) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        'Failed to create or update  device Information section.',
        '',
      );
    }
    return {
      status: true,
      message: 'successfully recorded',
    };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in recorded_device_IntoDb',
      error?.message || error,
    );
  }
};

const findByAllDeviceInfoIntoDb = async (query: Record<string, unknown>) => {
  try {
    const deviceinfosQuery = new QueryBuilder(
      deviceInfos.find({ isDelete: false }),
      query,
    )
      .search([])
      .filter()
      .sort()
      .paginate()
      .fields();
    const all_deviceinfo = await deviceinfosQuery.modelQuery;
    const meta = await deviceinfosQuery.countTotal();

    return { meta, all_deviceinfo };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error findByAllDeviceInfoIntoDb',
      error?.message || error,
    );
  }
};

const delete_deviceInfos_IntoDb = async (id: string) => {
  try {
    const result = await deviceInfos.findByIdAndDelete(id);
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

const device_Info_services = {
  recorded_device_Info_IntoDb,
  findByAllDeviceInfoIntoDb,
  delete_deviceInfos_IntoDb,
};

export default device_Info_services;
