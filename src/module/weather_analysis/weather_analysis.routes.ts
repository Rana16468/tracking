import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import WeatherValidation from './weather_analysis.validation';
import weather_analysis_controller from './weather_analysis.controller';

const route = express.Router();

route.patch(
  '/recorded_weather_info',
  validationRequest(WeatherValidation.create),
  weather_analysis_controller.recorded_wather_info,
);

const watherAnalysisRouter = route;
export default watherAnalysisRouter;
