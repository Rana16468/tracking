import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import IplocationValidation from './iplocation.validation';
import iplocation_controller from './iplocation.controller';

const router = express.Router();

router.patch(
  '/recordedIpLocation',
  validationRequest(IplocationValidation.create),
  iplocation_controller.recordedIpLocation,
);

const IpLocationRoutes = router;
export default IpLocationRoutes;
