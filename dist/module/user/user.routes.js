"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const user_validation_1 = __importDefault(require("./user.validation"));
const user_controller_1 = __importDefault(require("./user.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("./user.constant");
const router = express_1.default.Router();
router.post('/create_user', (0, validationRequest_1.default)(user_validation_1.default.createUserZodSchema), user_controller_1.default.createUser);
router.patch('/chnage_password', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validationRequest_1.default)(user_validation_1.default.ChnagePasswordSchema), user_controller_1.default.chnagePassword);
router.delete('/delete_admin_user/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.default.delete_admin_user);
router.delete('/delete_full_data_set/:visitorId', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.default.delete_full_data_set);
const UserRouters = router;
exports.default = UserRouters;
