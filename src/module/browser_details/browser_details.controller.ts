import { RequestHandler } from 'express';
import catchAsync from '../../utility/catchAsync';
import browser_details_services from './browser_details.services';
import sendRespone from '../../utility/sendRespone';
import httpStatus from 'http-status';

const create_detsils: RequestHandler = catchAsync(async (req, res) => {
  const result = await browser_details_services.createDetailsIntoDb(req.body);
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully  Recorded Time Zone',
    data: result,
  });
});

const browser_details_controller = {
  create_detsils,
};

export default browser_details_controller;
