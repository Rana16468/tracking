import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import {
  TDeviceInfoItems,
  DeviceInfoItemsResponse,
} from './device_info_items.interface';
import DeviceInfoItemsModel from './device_info_items.model';
import deviceinfoitems from './device_info_items.model';
import QueryBuilder from '../../app/builder/QueryBuilder';

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

const findByAlldeviceinfoitemsIntoDb = async (
  query: Record<string, unknown>,
) => {
  try {
    const deviceinfoitemsQuery = new QueryBuilder(
      deviceinfoitems.find({ isDelete: false }),
      query,
    )
      .search([])
      .filter()
      .sort()
      .paginate()
      .fields();
    const all_deviceinfoitems = await deviceinfoitemsQuery.modelQuery;
    const meta = await deviceinfoitemsQuery.countTotal();

    return { meta, all_deviceinfoitems };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error findByAllDeviceInfoIntoDb',
      error?.message || error,
    );
  }
};

const delete_deviceinfoitems_IntoDb = async (id: string) => {
  try {
    const result = await  deviceinfoitems.findByIdAndDelete(id);
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
      'Error delete_deviceinfoitems_IntoDb',
      error?.message || error,
    );
  }
};

const sevice_info_items_services = {
  recorded_device_info_items_IntoDb,
  findByAlldeviceinfoitemsIntoDb,
  delete_deviceinfoitems_IntoDb
};

export default sevice_info_items_services;
