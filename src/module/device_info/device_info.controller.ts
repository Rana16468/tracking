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

const device_Info_controller = {
  recorded_device_Info,
};

export default device_Info_controller;
