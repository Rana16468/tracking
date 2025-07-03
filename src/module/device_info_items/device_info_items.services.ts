import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import {
  TDeviceInfoItems,
  DeviceInfoItemsResponse,
} from './device_info_items.interface';
import DeviceInfoItemsModel from './device_info_items.model';

async function recorded_device_info_items_IntoDb(
  payload: TDeviceInfoItems,
): Promise<DeviceInfoItemsResponse> {
  try {
    const { visitorId, ...info } = payload;

    const updated = await DeviceInfoItemsModel.findOneAndUpdate(
      { visitorId },
      { visitorId, ...info },
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
        'Failed to record device info',
        '',
      );
    }

    return {
      status: true,
      message: 'Device information recorded successfully',
    };
  } catch (err: any) {
    if (err instanceof ApiError) throw err;

    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in recordDeviceInfo service',
      err.message,
    );
  }
}

const sevice_info_items_services = {
  recorded_device_info_items_IntoDb,
};

export default sevice_info_items_services;
