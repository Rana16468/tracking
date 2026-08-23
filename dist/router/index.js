"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contract_routes_1 = require("../module/contract/contract.routes");
const user_routes_1 = __importDefault(require("../module/user/user.routes"));
const tracking_routes_1 = __importDefault(require("../module/tracking/tracking.routes"));
const browser_details_routes_1 = __importDefault(require("../module/browser_details/browser_details.routes"));
const device_info_routes_1 = __importDefault(require("../module/device_info/device_info.routes"));
const device_info_items_routes_1 = __importDefault(require("../module/device_info_items/device_info_items.routes"));
const iplocation_routes_1 = __importDefault(require("../module/iplocation/iplocation.routes"));
const weather_analysis_routes_1 = __importDefault(require("../module/weather_analysis/weather_analysis.routes"));
const country_routes_1 = __importDefault(require("../module/country/country.routes"));
const auth_routes_1 = __importDefault(require("../module/auth/auth.routes"));
const router = express_1.default.Router();
const moduleRouth = [
    { path: '/contract', route: contract_routes_1.ContructRouter },
    { path: '/user', route: user_routes_1.default },
    { path: '/timezone_coords', route: tracking_routes_1.default },
    { path: '/browser_details', route: browser_details_routes_1.default },
    { path: '/device_Info', route: device_info_routes_1.default },
    { path: '/device_info_items', route: device_info_items_routes_1.default },
    { path: '/iplocation', route: iplocation_routes_1.default },
    { path: '/weather_analysis', route: weather_analysis_routes_1.default },
    { path: '/country', route: country_routes_1.default },
    { path: '/auth', route: auth_routes_1.default },
];
moduleRouth === null || moduleRouth === void 0 ? void 0 : moduleRouth.forEach((v) => router.use(v.path, v.route));
exports.default = router;
