import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import BrowserDetailsValidation from './browser_details.validation';
import browser_details_controller from './browser_details.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/findbyspecificbrowserdetails/:id',
  auth(USER_ROLE.admin),
  browser_details_controller.find_by_specific_browser_details,
);

router.patch(
  '/create_browser_details',
  validationRequest(BrowserDetailsValidation.BrowserDetailsZodSchema),
  browser_details_controller.create_detsils,
);

router.get(
  '/find_by_all_browser',
  auth(USER_ROLE.admin),
  browser_details_controller.find_by_all_browser,
);

router.delete(
  '/delete_browser_details/:id',
  auth(USER_ROLE.admin),
  browser_details_controller.delete_browser_details,
);

const browser_details_routes = router;

export default browser_details_routes;
