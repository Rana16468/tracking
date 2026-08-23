"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const iplocation_validation_1 = __importDefault(require("./iplocation.validation"));
const iplocation_controller_1 = __importDefault(require("./iplocation.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.patch('/recordedIpLocation', (0, validationRequest_1.default)(iplocation_validation_1.default.ipLocation), iplocation_controller_1.default.recordedIpLocation);
router.get('/specific_findby_iplocation/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), iplocation_controller_1.default.specificFindByIpLocation);
router.get('/find_by_all_Ip_location', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), iplocation_controller_1.default.findByAllIplocation);
router.delete('/delete_iplocations/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), iplocation_controller_1.default.delete_iplocations);
const IpLocationRoutes = router;
exports.default = IpLocationRoutes;
