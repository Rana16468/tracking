import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import WeatherValidation from './weather_analysis.validation';
import weather_analysis_controller from './weather_analysis.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';


const route = express.Router();

route.patch(
  '/recorded_weather_info',
  validationRequest(WeatherValidation.create),
  weather_analysis_controller.recorded_wather_info,
);

route.get(
  '/find_by_all_weather_anlysis',
  auth(USER_ROLE.admin),
  weather_analysis_controller.findByAllWeatherAanlysis,
);

route.delete(
  '/delete_weather_anlysis/:id',
  auth(USER_ROLE.admin),
  weather_analysis_controller.delete_weather_anlysis,
);

const watherAnalysisRouter = route;
export default watherAnalysisRouter;
