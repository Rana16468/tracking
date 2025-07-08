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

const findByAllTimeZone: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.findByAllTimeZoneIntoDb(req.query);

  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Find All Time Zone',
    data: result,
  });
});

const delete_timezones: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.delete_timezones_IntoDb(req.params.id);
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete',
    data: result,
  });
});

const find_by_specific_timezones: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await TimeZoneServices.find_by_specific_timezones_IntoDb(
      req.params.id,
    );
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Find Specific Time Zones',
      data: result,
    });
  },
);

const TimeZoneController = {
  createTimeZone,
  findByAllTimeZone,
  delete_timezones,
  find_by_specific_timezones,
};

export default TimeZoneController;
