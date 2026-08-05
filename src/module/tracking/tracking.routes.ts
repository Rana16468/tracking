import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import TimeZoneValidation from './tracking.validation';
import TimeZoneController from './tracking.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.patch(
  '/create_timezone_coords',
  validationRequest(TimeZoneValidation.TTimeZoneSchemaZ),
  TimeZoneController.createTimeZone,
);

router.get(
  '/find_all_time_zone',
  auth(USER_ROLE.admin),
  TimeZoneController.findByAllTimeZone,
);

router.delete(
  '/delete_timezones/:id',
  auth(USER_ROLE.admin),
  TimeZoneController.delete_timezones,
);

router.get(
  '/find_by_specific_timezones/:id',
  auth(USER_ROLE.admin),
  TimeZoneController.find_by_specific_timezones,
);

router.get('/all_country_create_into_db',
   TimeZoneController.allCountryCreateIntoDB);
router.get('/import_all_countries',
   auth(USER_ROLE.admin), TimeZoneController.importAllCountries);
router.post('/create_country', auth(USER_ROLE.admin), TimeZoneController.createCountry);
router.get('/find_all_country', auth(USER_ROLE.admin), TimeZoneController.findByAllCountry);
router.get('/find_by_specific_country/:id', auth(USER_ROLE.admin), TimeZoneController.find_by_specific_country);
router.patch('/update_country/:id', auth(USER_ROLE.admin), TimeZoneController.update_country);
router.delete('/delete_country/:id', auth(USER_ROLE.admin), TimeZoneController.delete_country);

const timezoneCoords = router;
export default timezoneCoords;
