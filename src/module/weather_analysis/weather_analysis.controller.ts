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

const findByAllWeatherAanlysis: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await weather_analysis_services.findByAllWeatherAanlysistoDb(
      req.query,
    );
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Find By All Weather Data',
      data: result,
    });
  },
);

const delete_weather_anlysis: RequestHandler = catchAsync(async (req, res) => {
  const result = await weather_analysis_services.delete_weather_anlysis_IntoDb(
    req.params.id,
  );
  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete',
    data: result,
  });
});

const weather_analysis_controller = {
  recorded_wather_info,
  findByAllWeatherAanlysis,
  delete_weather_anlysis
};
export default weather_analysis_controller;
