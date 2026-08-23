"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const device_info_items_validation_1 = __importDefault(require("./device_info_items.validation"));
const device_info_items_controller_1 = __importDefault(require("./device_info_items.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.patch('/recorded_device_info_items', (0, validationRequest_1.default)(device_info_items_validation_1.default.create), device_info_items_controller_1.default.recorded_device_info_items);
router.get('/find_by_all_deviceinfoitems', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), device_info_items_controller_1.default.findByAlldeviceinfoitems);
router.delete('/delete_deviceinfoitems/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), device_info_items_controller_1.default.delete_deviceinfoitems);
const DeviceInfoItemsRoutes = router;
exports.default = DeviceInfoItemsRoutes;
