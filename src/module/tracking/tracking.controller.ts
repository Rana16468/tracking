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

const allCountryCreateIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.allCountryCreateIntoDB();

  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully fetched country data',
    data: result,
  });
});

const importAllCountries: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.importAllCountriesIntoDb();

  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully imported country data',
    data: result,
  });
});

const createCountry: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.createCountryIntoDb(req.body);

  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully created or updated country',
    data: result,
  });
});

const findByAllCountry: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.findByAllCountryIntoDb(req.query);

  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully fetched countries',
    data: result,
  });
});

const find_by_specific_country: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.find_by_specific_country_IntoDb(req.params.id);

  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully fetched country',
    data: result,
  });
});

const update_country: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.update_country_IntoDb(req.params.id, req.body);

  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated country',
    data: result,
  });
});

const delete_country: RequestHandler = catchAsync(async (req, res) => {
  const result = await TimeZoneServices.delete_country_IntoDb(req.params.id);

  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully deleted country',
    data: result,
  });
});

const TimeZoneController = {
  createTimeZone,
  findByAllTimeZone,
  delete_timezones,
  find_by_specific_timezones,
  allCountryCreateIntoDB,
  importAllCountries,
  createCountry,
  findByAllCountry,
  find_by_specific_country,
  update_country,
  delete_country,
};

export default TimeZoneController;
