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

const device_Info_controller = {
  recorded_device_Info,
  findByAllDeviceInfo,
  delete_deviceInfos,
};

export default device_Info_controller;
