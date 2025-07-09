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

const findByAllIplocation: RequestHandler = catchAsync(async (req, res) => {
  const result = await iplocation_services.findByAllIplocationtoDb(req.query);
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Find By All IpLocation',
    data: result,
  });
});

const delete_iplocations: RequestHandler = catchAsync(async (req, res) => {
  const result = await iplocation_services.delete_iplocations_IntoDb(
    req.params.id,
  );
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete',
    data: result,
  });
});

const specificFindByIpLocation: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await iplocation_services.specificFindByIpLocationIntoDb(
      req.params.id,
    );
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Find By IpLocation',
      data: result,
    });
  },
);

const iplocation_controller = {
  recordedIpLocation,
  findByAllIplocation,
  delete_iplocations,
  specificFindByIpLocation
};

export default iplocation_controller;
