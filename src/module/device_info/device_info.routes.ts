import express from 'express';
import { validate } from 'uuid';
import validationRequest from '../../middleware/validationRequest';
import DeviceInfoValidation from './device_info.validation';
import device_Info_controller from './device_info.controller';

const router = express.Router();

router.patch(
  '/recorded_device_Info',
  validationRequest(DeviceInfoValidation.DeviceInfoZodSchema),
  device_Info_controller.recorded_device_Info,
);

const DeviceInfoRoutes = router;

export default DeviceInfoRoutes;
