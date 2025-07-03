import { RequestHandler } from 'express';
import catchAsync from '../../utility/catchAsync';
import iplocation_services from './iplocation.services';
import sendRespone from '../../utility/sendRespone';
import httpStatus from 'http-status';

const recordedIpLocation: RequestHandler = catchAsync(async (req, res) => {
  const result = await iplocation_services.recordIpLocationIntoDb(req.body);
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Recorderd IP Location',
    data: result,
  });
});

const iplocation_controller = {
  recordedIpLocation,
};

export default iplocation_controller;
