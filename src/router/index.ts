import express from 'express';
import { ContructRouter } from '../module/contract/contract.routes';
import UserRouters from '../module/user/user.routes';
import timezoneCoords from '../module/tracking/tracking.routes';
import browser_details_routes from '../module/browser_details/browser_details.routes';
import DeviceInfoRoutes from '../module/device_info/device_info.routes';
import DeviceInfoItemsRoutes from '../module/device_info_items/device_info_items.routes';
import IpLocationRoutes from '../module/iplocation/iplocation.routes';
import watherAnalysisRouter from '../module/weather_analysis/weather_analysis.routes';
import AuthRouter from '../module/auth/auth.routes';

const router = express.Router();
const moduleRouth = [
  { path: '/contract', route: ContructRouter },
  { path: '/user', route: UserRouters },
  { path: '/timezone_coords', route: timezoneCoords },
  { path: '/browser_details', route: browser_details_routes },
  { path: '/device_Info', route: DeviceInfoRoutes },
  { path: '/device_info_items', route: DeviceInfoItemsRoutes },
  { path: '/iplocation', route: IpLocationRoutes },
  { path: '/weather_analysis', route: watherAnalysisRouter },
  { path: '/auth', route: AuthRouter },
];

moduleRouth?.forEach((v) => router.use(v.path, v.route));

export default router;
