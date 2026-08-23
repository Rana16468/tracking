"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const weather_analysis_validation_1 = __importDefault(require("./weather_analysis.validation"));
const weather_analysis_controller_1 = __importDefault(require("./weather_analysis.controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const route = express_1.default.Router();
route.patch('/recorded_weather_info', (0, validationRequest_1.default)(weather_analysis_validation_1.default.create), weather_analysis_controller_1.default.recorded_wather_info);
route.get('/find_by_all_weather_anlysis', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), weather_analysis_controller_1.default.findByAllWeatherAanlysis);
route.delete('/delete_weather_anlysis/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), weather_analysis_controller_1.default.delete_weather_anlysis);
route.get('/find_by_specific_weather_analysis/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), weather_analysis_controller_1.default.find_by_specific_weather_analysis);
const watherAnalysisRouter = route;
exports.default = watherAnalysisRouter;
