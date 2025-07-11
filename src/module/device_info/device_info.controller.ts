import { RequestHandler } from 'express';
import catchAsync from '../../utility/catchAsync';
import device_Info_services from './device_info.services';
import sendRespone from '../../utility/sendRespone';
import httpStatus from 'http-status';

const recorded_device_Info: RequestHandler = catchAsync(async (req, res) => {
  const result = await device_Info_services.recorded_device_Info_IntoDb(
    req.body,
  );

  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully  Recorded device Information',
    data: result,
  });
});

const findByAllDeviceInfo: RequestHandler = catchAsync(async (req, res) => {
  const result = await device_Info_services.findByAllDeviceInfoIntoDb(
    req.query,
  );
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Find By All Device Info',
    data: result,
  });
});

const delete_deviceInfos: RequestHandler = catchAsync(async (req, res) => {
  const result = await device_Info_services.delete_deviceInfos_IntoDb(
    req.params.id,
  );
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete',
    data: result,
  });
});

const dashboard_infomation: RequestHandler = catchAsync(async (req, res) => {
  const result = await device_Info_services.dashboard_infomation_IntoDb();
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Find Dashboard Info',
    data: result,
  });
});

const dashboard_timezone_graph: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await device_Info_services.dashboard_timezone_graph_IntoDb(
      req.query.year as any,
    );
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Find Dashboard Weathers Graph',
      data: result,
    });
  },
);

const dashboard_ipweathers_graph: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await device_Info_services.dashboard_ipweathers_graph_IntoDb(
      req.query.year as any,
    );
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Find Dashboard Weathers Graph',
      data: result,
    });
  },
);

const dashboard_iplocations_graph: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await device_Info_services.dashboard_iplocations_graph_IntoDb(
        req.query.year as any,
      );
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Find Dashboard Ip Location  Graph',
      data: result,
    });
  },
);

const dashboard_deviceinfos_graph: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await device_Info_services.dashboard_deviceinfos_graph_IntoDb(
        req.query.year as any,
      );
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Find Dashboard Deviceinfos  Graph',
      data: result,
    });
  },
);

const dashboard_deviceinfoitems_graph: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await device_Info_services.dashboard_deviceinfoitems_graph_IntoDb(
        req.query.year as any,
      );
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Find Dashboard Deviceinfoitems  Graph',
      data: result,
    });
  },
);

const dashboard_browserdetails_graph: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await device_Info_services.dashboard_browserdetails_graph_IntoDb(
        req.query.year as any,
      );
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Find Dashboard Browser Details  Graph',
      data: result,
    });
  },
);

const dashboard_contracts_graph: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await device_Info_services.dashboard_contracts_graph_IntoDb(
      req.query.year as any,
    );
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Find Dashboard Contracts  Graph',
      data: result,
    });
  },
);

const dashboard_users_graph: RequestHandler = catchAsync(async (req, res) => {
  const result = await device_Info_services.dashboard_users_graph_IntoDb(
    req.query?.year as any,
  );
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Find Dashboard User Graph',
    data: result,
  });
});

const device_Info_controller = {
  recorded_device_Info,
  findByAllDeviceInfo,
  delete_deviceInfos,
  dashboard_infomation,
  dashboard_timezone_graph,
  dashboard_ipweathers_graph,
  dashboard_iplocations_graph,
  dashboard_deviceinfos_graph,
  dashboard_deviceinfoitems_graph,
  dashboard_browserdetails_graph,
  dashboard_contracts_graph,
  dashboard_users_graph,
};

export default device_Info_controller;
