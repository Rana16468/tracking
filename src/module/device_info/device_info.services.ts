import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import { DeviceInfoResponse, TDeviceInfo } from './device_info.interface';
import deviceInfos from './device_info.model';

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

const device_Info_services = {
  recorded_device_Info_IntoDb,
};

export default device_Info_services;
