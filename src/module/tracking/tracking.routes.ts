import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import TimeZoneValidation from './tracking.validation';
import TimeZoneController from './tracking.controller';

const router = express.Router();

router.patch(
  '/create_timezone_coords',
  validationRequest(TimeZoneValidation.TTimeZoneSchemaZ),
  TimeZoneController.createTimeZone,
);

const timezoneCoords = router;
export default timezoneCoords;
