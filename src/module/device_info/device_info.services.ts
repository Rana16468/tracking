import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import { DeviceInfoResponse, TDeviceInfo } from './device_info.interface';
import deviceInfos from './device_info.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import users from '../user/user.model';
import timezones from '../tracking/tracking.model';
import ipweathers from '../weather_analysis/weather_analysis.model';
import iplocations from '../iplocation/iplocation.model';
import deviceinfoitems from '../device_info_items/device_info_items.model';
import { Contract } from '../contract/contract.model';
import browserdetails from '../browser_details/browser_details.model';
import monthNames from '../../utility/monthNames';

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
      .search(['visitorId', 'browser', 'device', 'os'])

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

const dashboard_infomation_IntoDb = async () => {
  try {
    const collections = [
      { key: 'totalUsers', model: users },
      { key: 'totalTimezones', model: timezones },
      { key: 'totalppweathers', model: ipweathers },
      { key: 'totalIplocations', model: iplocations },
      { key: 'totalDeviceinfos', model: deviceInfos },
      { key: 'totalDeviceinfoitems', model: deviceinfoitems },
      { key: 'totalContracts', model: Contract },
      { key: 'totalBrowserdetails', model: browserdetails },
    ];

    const counts = await Promise.all(
      collections.map(({ model }) => model.countDocuments()),
    );

    const result = collections.reduce(
      (acc, { key }, index) => {
        acc[key] = counts[index];
        return acc;
      },
      {} as Record<string, number>,
    );

    return result;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error dashboard_infomation_IntoDb',
      error?.message || error,
    );
  }
};
const dashboard_timezone_graph_IntoDb = async (year: number) => {
  try {
    const targetYear = Number(year) || new Date().getFullYear();

    const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
    const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);

    const result = await timezones.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: '$_id',
          userCount: '$count',
          _id: 0,
        },
      },
    ]);
    const monthlyData = monthNames.map((month, index) => {
      const data = result.find((r) => r.month === index + 1);
      return {
        month,
        userCount: data?.userCount || 0,
      };
    });

    return {
      success: true,
      message: `Successfully fetched timezone graph for ${targetYear}`,
      data: monthlyData,
    };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in dashboard_timezone_graph_IntoDb',
      error?.message || error,
    );
  }
};

const dashboard_ipweathers_graph_IntoDb = async (year: number) => {
  try {
    const targetYear = Number(year) || new Date().getFullYear();

    const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
    const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);

    const result = await ipweathers.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: '$_id',
          userCount: '$count',
          _id: 0,
        },
      },
    ]);

    const monthlyData = monthNames.map((month, index) => {
      const data = result.find((r) => r.month === index + 1);
      return {
        month,
        userCount: data?.userCount || 0,
      };
    });

    return {
      success: true,
      message: `Successfully fetched timezone graph for ${targetYear}`,
      data: monthlyData,
    };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in dashboard_timezone_graph_IntoDb',
      error?.message || error,
    );
  }
};

const dashboard_iplocations_graph_IntoDb = async (year: number) => {
  try {
    const targetYear = Number(year) || new Date().getFullYear();

    const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
    const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);

    const result = await iplocations.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: '$_id',
          userCount: '$count',
          _id: 0,
        },
      },
    ]);

    const monthlyData = monthNames.map((month, index) => {
      const data = result.find((r) => r.month === index + 1);
      return {
        month,
        userCount: data?.userCount || 0,
      };
    });

    return {
      success: true,
      message: `Successfully fetched iplocations graph for ${targetYear}`,
      data: monthlyData,
    };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in dashboard_iplocations_graph_IntoDb',
      error?.message || error,
    );
  }
};

const dashboard_deviceinfos_graph_IntoDb = async (year: number) => {
  try {
    const targetYear = Number(year) || new Date().getFullYear();

    const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
    const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);

    const result = await deviceInfos.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: '$_id',
          userCount: '$count',
          _id: 0,
        },
      },
    ]);

    const monthlyData = monthNames.map((month, index) => {
      const data = result.find((r) => r.month === index + 1);
      return {
        month,
        userCount: data?.userCount || 0,
      };
    });

    return {
      success: true,
      message: `Successfully fetched deviceinfos graph for ${targetYear}`,
      data: monthlyData,
    };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in dashboard deviceinfos_graph_IntoDb',
      error?.message || error,
    );
  }
};

const dashboard_deviceinfoitems_graph_IntoDb = async (year: number) => {
  try {
    const targetYear = Number(year) || new Date().getFullYear();

    const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
    const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);

    const result = await deviceinfoitems.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: '$_id',
          userCount: '$count',
          _id: 0,
        },
      },
    ]);

    const monthlyData = monthNames.map((month, index) => {
      const data = result.find((r) => r.month === index + 1);
      return {
        month,
        userCount: data?.userCount || 0,
      };
    });

    return {
      success: true,
      message: `Successfully fetched deviceinfoitems graph for ${targetYear}`,
      data: monthlyData,
    };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in dashboard deviceinfos_graph_IntoDb',
      error?.message || error,
    );
  }
};

const dashboard_browserdetails_graph_IntoDb = async (year: number) => {
  try {
    const targetYear = Number(year) || new Date().getFullYear();

    const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
    const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);

    const result = await browserdetails.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: '$_id',
          userCount: '$count',
          _id: 0,
        },
      },
    ]);

    const monthlyData = monthNames.map((month, index) => {
      const data = result.find((r) => r.month === index + 1);
      return {
        month,
        userCount: data?.userCount || 0,
      };
    });

    return {
      success: true,
      message: `Successfully fetched browserdetails graph for ${targetYear}`,
      data: monthlyData,
    };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in dashboard browserdetails_graph_IntoDb',
      error?.message || error,
    );
  }
};
//contracts

const dashboard_contracts_graph_IntoDb = async (year: number) => {
  try {
    const targetYear = Number(year) || new Date().getFullYear();

    const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
    const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);

    const result = await Contract.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: '$_id',
          userCount: '$count',
          _id: 0,
        },
      },
    ]);

    const monthlyData = monthNames.map((month, index) => {
      const data = result.find((r) => r.month === index + 1);
      return {
        month,
        userCount: data?.userCount || 0,
      };
    });

    return {
      success: true,
      message: `Successfully fetched contracts graph for ${targetYear}`,
      data: monthlyData,
    };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in dashboard contracts_graph_IntoDb',
      error?.message || error,
    );
  }
};
const dashboard_users_graph_IntoDb = async (year: number) => {
  try {
    const targetYear = Number(year) || new Date().getFullYear();

    const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
    const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);

    const result = await users.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: '$_id',
          userCount: '$count',
          _id: 0,
        },
      },
    ]);

    const monthlyData = monthNames.map((month, index) => {
      const data = result.find((r) => r.month === index + 1);
      return {
        month,
        userCount: data?.userCount || 0,
      };
    });

    return {
      success: true,
      message: `Successfully fetched contracts graph for ${targetYear}`,
      data: monthlyData,
    };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in dashboard contracts_graph_IntoDb',
      error?.message || error,
    );
  }
};

const device_Info_services = {
  recorded_device_Info_IntoDb,
  findByAllDeviceInfoIntoDb,
  delete_deviceInfos_IntoDb,
  dashboard_infomation_IntoDb,
  dashboard_timezone_graph_IntoDb,
  dashboard_ipweathers_graph_IntoDb,
  dashboard_iplocations_graph_IntoDb,
  dashboard_deviceinfos_graph_IntoDb,
  dashboard_deviceinfoitems_graph_IntoDb,
  dashboard_browserdetails_graph_IntoDb,
  dashboard_contracts_graph_IntoDb,
  dashboard_users_graph_IntoDb,
};

export default device_Info_services;
