"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const weather_analysis_services_1 = __importDefault(require("./weather_analysis.services"));
const sendRespone_1 = __importDefault(require("../../utility/sendRespone"));
const http_status_1 = __importDefault(require("http-status"));
const recorded_wather_info = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield weather_analysis_services_1.default.recorded_wather_info_intodb(req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully  Recorded Wather Info',
        data: result,
    });
}));
const findByAllWeatherAanlysis = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield weather_analysis_services_1.default.findByAllWeatherAanlysistoDb(req.query);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find By All Weather Data',
        data: result,
    });
}));
const delete_weather_anlysis = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield weather_analysis_services_1.default.delete_weather_anlysis_IntoDb(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Delete',
        data: result,
    });
}));
const find_by_specific_weather_analysis = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield weather_analysis_services_1.default.find_by_specific_weather_analysis_IntoDb(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully find by the specific weather analysis',
        data: result,
    });
}));
const weather_analysis_controller = {
    recorded_wather_info,
    findByAllWeatherAanlysis,
    delete_weather_anlysis,
    find_by_specific_weather_analysis
};
exports.default = weather_analysis_controller;
