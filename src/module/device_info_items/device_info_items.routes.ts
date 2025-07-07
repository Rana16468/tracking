import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import DeviceInfoItemsValidation from './device_info_items.validation';
import sevice_info_items_controller from './device_info_items.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.patch(
  '/recorded_device_info_items',
  validationRequest(DeviceInfoItemsValidation.create),
  sevice_info_items_controller.recorded_device_info_items,
);

router.get(
  '/find_by_all_deviceinfoitems',
  auth(USER_ROLE.admin),
  sevice_info_items_controller.findByAlldeviceinfoitems,
);

router.delete(
  '/delete_deviceinfoitems/:id',
  auth(USER_ROLE.admin),
  sevice_info_items_controller.delete_deviceinfoitems,
);

const DeviceInfoItemsRoutes = router;
export default DeviceInfoItemsRoutes;
