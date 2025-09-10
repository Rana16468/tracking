import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import IplocationValidation from './iplocation.validation';
import iplocation_controller from './iplocation.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.patch(
  '/recordedIpLocation',
  validationRequest(IplocationValidation.ipLocation),
  iplocation_controller.recordedIpLocation,
);

router.get(
  '/specific_findby_iplocation/:id',
  auth(USER_ROLE.admin),
  iplocation_controller.specificFindByIpLocation,
);

router.get(
  '/find_by_all_Ip_location',
  auth(USER_ROLE.admin),
  iplocation_controller.findByAllIplocation,
);

router.delete(
  '/delete_iplocations/:id',
  auth(USER_ROLE.admin),
  iplocation_controller.delete_iplocations,
);


const IpLocationRoutes = router;
export default IpLocationRoutes;
