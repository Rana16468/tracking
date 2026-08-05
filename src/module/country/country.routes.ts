import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import CountryController from './country.controller';
import CountryValidation from './country.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create',
  validationRequest(CountryValidation.CountryZodSchema),
  CountryController.createCountry,
);

router.get(
  '/find_all',
  CountryController.findAllCountries,
);

router.get(
  '/find/:id',
  auth(USER_ROLE.admin),
  CountryController.findCountryById,
);

router.put(
  '/update/:id',
  auth(USER_ROLE.admin),
  validationRequest(CountryValidation.CountryUpdateZodSchema),
  CountryController.updateCountry,
);

router.delete(
  '/delete/:id',
  auth(USER_ROLE.admin),
  CountryController.deleteCountry,
);

const CountryRoutes = router;
export default CountryRoutes;
