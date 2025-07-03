import { RequestHandler } from 'express';
import catchAsync from '../../utility/catchAsync';
import weather_analysis_services from './weather_analysis.services';
import sendRespone from '../../utility/sendRespone';
import httpStatus from 'http-status';

const recorded_wather_info: RequestHandler = catchAsync(async (req, res) => {
  const result = await weather_analysis_services.recorded_wather_info_intodb(
    req.body,
  );
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully  Recorded Wather Info',
    data: result,
  });
});

const weather_analysis_controller = {
  recorded_wather_info,
};
export default weather_analysis_controller;
