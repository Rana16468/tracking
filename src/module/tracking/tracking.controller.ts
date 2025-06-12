import { RequestHandler } from 'express';
import catchAsync from '../../utility/catchAsync';
import TimeZoneServices from './tracking.services';
import sendRespone from '../../utility/sendRespone';
import httpStatus from 'http-status';

const createTimeZone: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.createTimeZoneIntoDb(req.body);

  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully  Recorded Time Zone',
    data: result,
  });
});

const TimeZoneController = {
  createTimeZone,
};

export default TimeZoneController;
