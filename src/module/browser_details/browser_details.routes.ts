import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import BrowserDetailsValidation from './browser_details.validation';
import browser_details_controller from './browser_details.controller';

const router = express.Router();

router.patch(
  '/create_browser_details',
  validationRequest(BrowserDetailsValidation.BrowserDetailsZodSchema),
  browser_details_controller.create_detsils,
);

const browser_details_routes = router;

export default browser_details_routes;
