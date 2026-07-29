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
    message: 'Successfully recorded timezone',
    data: result,
  });
});

const findByAllTimeZone: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.findByAllTimeZoneIntoDb(req.query);
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved timezones',
    data: result,
  });
});

const delete_timezones: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.delete_timezones_IntoDb(req.params.id);
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted timezone record',
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
      message: 'Successfully retrieved specific timezone record',
      data: result,
    });
  },
);

const findByAllCompanyList: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.findByAllCompanyListIntoDb(req.query);
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully fetched company/country list',
    data: result,
  });
});

const TimeZoneController = {
  createTimeZone,
  findByAllTimeZone,
  delete_timezones,
  find_by_specific_timezones,
  findByAllCompanyList,
};

export default TimeZoneController;
