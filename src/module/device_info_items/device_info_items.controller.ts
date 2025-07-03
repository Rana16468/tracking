import { RequestHandler } from 'express';
import catchAsync from '../../utility/catchAsync';
import sevice_info_items_services from './device_info_items.services';
import sendRespone from '../../utility/sendRespone';
import httpStatus from 'http-status';

const recorded_device_info_items: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await sevice_info_items_services.recorded_device_info_items_IntoDb(
        req.body,
      );

    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Recorderd Device Info Items',
      data: result,
    });
  },
);

const sevice_info_items_controller = {
  recorded_device_info_items,
};

export default sevice_info_items_controller;
