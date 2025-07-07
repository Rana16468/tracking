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

const find_by_all_browser: RequestHandler = catchAsync(async (req, res) => {
  const result = await browser_details_services.findByAllbrowserdetailsIntoDb(
    req.query,
  );
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Find By All Browsers',
    data: result,
  });
});

const find_by_specific_browser_details: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await browser_details_services.find_by_specific_browser_details_IntoDb(
        req.params.id,
      );
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Find By Specific Browser Details',
      data: result,
    });
  },
);

const delete_browser_details: RequestHandler = catchAsync(async (req, res) => {
  const result = await browser_details_services.delete_browser_details_IntoDb(
    req.params.id,
  );
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully  Delete',
    data: result,
  });
});

const browser_details_controller = {
  create_detsils,
  find_by_all_browser,
  find_by_specific_browser_details,
  delete_browser_details
};

export default browser_details_controller;
