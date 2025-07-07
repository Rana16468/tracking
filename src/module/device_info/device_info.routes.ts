import express from 'express';
import { validate } from 'uuid';
import validationRequest from '../../middleware/validationRequest';
import DeviceInfoValidation from './device_info.validation';
import device_Info_controller from './device_info.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.patch(
  '/recorded_device_Info',
  validationRequest(DeviceInfoValidation.DeviceInfoZodSchema),
  device_Info_controller.recorded_device_Info,
);

router.get(
  '/find_by_all_device_info',
  auth(USER_ROLE.admin),
  device_Info_controller.findByAllDeviceInfo,
);

router.get(
  '/delete_deviceInfos/:id',
  auth(USER_ROLE.admin),
  device_Info_controller.delete_deviceInfos,
);

const DeviceInfoRoutes = router;

export default DeviceInfoRoutes;
