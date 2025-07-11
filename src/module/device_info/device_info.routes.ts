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

router.get(
  '/dashboard_infomation',
  auth(USER_ROLE.admin),
  device_Info_controller.dashboard_infomation,
);

router.get(
  '/dashboard_timezone_graph',
  auth(USER_ROLE.admin),
  device_Info_controller.dashboard_timezone_graph,
);

router.get(
  '/dashboard_ipweathers_graph',
  auth(USER_ROLE.admin),
  device_Info_controller.dashboard_ipweathers_graph,
);

router.get(
  '/dashboard_iplocations_graph',
  auth(USER_ROLE.admin),
  device_Info_controller.dashboard_iplocations_graph,
);

router.get(
  '/dashboard_deviceinfos_graph',
  auth(USER_ROLE.admin),
  device_Info_controller.dashboard_deviceinfos_graph,
);

router.get(
  '/dashboard_deviceinfoitems_graph',
  auth(USER_ROLE.admin),
  device_Info_controller.dashboard_deviceinfoitems_graph,
);

router.get(
  '/dashboard_browserdetails_graph',
  auth(USER_ROLE.admin),
  device_Info_controller.dashboard_browserdetails_graph,
);

router.get(
  '/dashboard_contracts_graph',
  auth(USER_ROLE.admin),
  device_Info_controller.dashboard_contracts_graph,
);

router.get(
  '/dashboard_users_graph',
  auth(USER_ROLE.admin),
  device_Info_controller.dashboard_users_graph,
);

const DeviceInfoRoutes = router;

export default DeviceInfoRoutes;
