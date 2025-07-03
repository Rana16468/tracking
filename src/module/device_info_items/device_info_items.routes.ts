import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import DeviceInfoItemsValidation from './device_info_items.validation';
import sevice_info_items_controller from './device_info_items.controller';

const router = express.Router();

router.patch(
  '/recorded_device_info_items',
  validationRequest(DeviceInfoItemsValidation.create),
  sevice_info_items_controller.recorded_device_info_items,
);

const DeviceInfoItemsRoutes = router;
export default DeviceInfoItemsRoutes;
