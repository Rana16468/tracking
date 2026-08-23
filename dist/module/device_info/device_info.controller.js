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
const device_info_services_1 = __importDefault(require("./device_info.services"));
const sendRespone_1 = __importDefault(require("../../utility/sendRespone"));
const http_status_1 = __importDefault(require("http-status"));
const recorded_device_Info = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_services_1.default.recorded_device_Info_IntoDb(req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully  Recorded device Information',
        data: result,
    });
}));
const findByAllDeviceInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_services_1.default.findByAllDeviceInfoIntoDb(req.query);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find By All Device Info',
        data: result,
    });
}));
const delete_deviceInfos = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_services_1.default.delete_deviceInfos_IntoDb(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Delete',
        data: result,
    });
}));
const dashboard_infomation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_services_1.default.dashboard_infomation_IntoDb();
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find Dashboard Info',
        data: result,
    });
}));
const dashboard_timezone_graph = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_services_1.default.dashboard_timezone_graph_IntoDb(req.query.year);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find Dashboard Weathers Graph',
        data: result,
    });
}));
const dashboard_ipweathers_graph = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_services_1.default.dashboard_ipweathers_graph_IntoDb(req.query.year);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find Dashboard Weathers Graph',
        data: result,
    });
}));
const dashboard_iplocations_graph = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_services_1.default.dashboard_iplocations_graph_IntoDb(req.query.year);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find Dashboard Ip Location  Graph',
        data: result,
    });
}));
const dashboard_deviceinfos_graph = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_services_1.default.dashboard_deviceinfos_graph_IntoDb(req.query.year);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find Dashboard Deviceinfos  Graph',
        data: result,
    });
}));
const dashboard_deviceinfoitems_graph = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_services_1.default.dashboard_deviceinfoitems_graph_IntoDb(req.query.year);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find Dashboard Deviceinfoitems  Graph',
        data: result,
    });
}));
const dashboard_browserdetails_graph = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_services_1.default.dashboard_browserdetails_graph_IntoDb(req.query.year);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find Dashboard Browser Details  Graph',
        data: result,
    });
}));
const dashboard_contracts_graph = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_services_1.default.dashboard_contracts_graph_IntoDb(req.query.year);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find Dashboard Contracts  Graph',
        data: result,
    });
}));
const dashboard_users_graph = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield device_info_services_1.default.dashboard_users_graph_IntoDb((_a = req.query) === null || _a === void 0 ? void 0 : _a.year);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find Dashboard User Graph',
        data: result,
    });
}));
const device_Info_controller = {
    recorded_device_Info,
    findByAllDeviceInfo,
    delete_deviceInfos,
    dashboard_infomation,
    dashboard_timezone_graph,
    dashboard_ipweathers_graph,
    dashboard_iplocations_graph,
    dashboard_deviceinfos_graph,
    dashboard_deviceinfoitems_graph,
    dashboard_browserdetails_graph,
    dashboard_contracts_graph,
    dashboard_users_graph,
};
exports.default = device_Info_controller;
