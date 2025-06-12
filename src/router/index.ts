import express from 'express';
import { ContructRouter } from '../module/contract/contract.routes';
import UserRouters from '../module/user/user.routes';
import timezoneCoords from '../module/tracking/tracking.routes';
import browser_details_routes from '../module/browser_details/browser_details.routes';

const router = express.Router();
const moduleRouth = [
  { path: '/contract', route: ContructRouter },
  { path: '/user', route: UserRouters },
  { path: '/timezone_coords', route: timezoneCoords },
  { path: '/browser_details', route: browser_details_routes },
];

moduleRouth.forEach((v) => router.use(v.path, v.route));

export default router;
