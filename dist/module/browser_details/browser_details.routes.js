"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const browser_details_validation_1 = __importDefault(require("./browser_details.validation"));
const browser_details_controller_1 = __importDefault(require("./browser_details.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.get('/findbyspecificbrowserdetails/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), browser_details_controller_1.default.find_by_specific_browser_details);
router.patch('/create_browser_details', (0, validationRequest_1.default)(browser_details_validation_1.default.BrowserDetailsZodSchema), browser_details_controller_1.default.create_detsils);
router.get('/find_by_all_browser', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), browser_details_controller_1.default.find_by_all_browser);
router.delete('/delete_browser_details/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), browser_details_controller_1.default.delete_browser_details);
const browser_details_routes = router;
exports.default = browser_details_routes;
