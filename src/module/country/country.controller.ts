import { RequestHandler } from 'express';
import catchAsync from '../../utility/catchAsync';
import sendRespone from '../../utility/sendRespone';
import httpStatus from 'http-status';
import CountryServices from './country.services';

const createCountry: RequestHandler = catchAsync(async (req, res) => {
  const result = await CountryServices.createCountryIntoDb(req.body);
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Country created successfully',
    data: result,
  });
});

const findAllCountries: RequestHandler = catchAsync(async (req, res) => {
  const result = await CountryServices.findAllCountriesIntoDb(req.query);
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Countries fetched successfully',
    data: result,
  });
});

const findCountryById: RequestHandler = catchAsync(async (req, res) => {
  const result = await CountryServices.findCountryByIdIntoDb(req.params.id);
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Country fetched successfully',
    data: result,
  });
});

const updateCountry: RequestHandler = catchAsync(async (req, res) => {
  const result = await CountryServices.updateCountryIntoDb(req.params.id, req.body);
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Country updated successfully',
    data: result,
  });
});

const deleteCountry: RequestHandler = catchAsync(async (req, res) => {
  const result = await CountryServices.deleteCountryIntoDb(req.params.id);
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Country deleted successfully',
    data: result,
  });
});

const CountryController = {
  createCountry,
  findAllCountries,
  findCountryById,
  updateCountry,
  deleteCountry,
};

export default CountryController;
