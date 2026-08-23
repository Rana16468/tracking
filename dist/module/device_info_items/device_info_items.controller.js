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
const device_info_items_services_1 = __importDefault(require("./device_info_items.services"));
const sendRespone_1 = __importDefault(require("../../utility/sendRespone"));
const http_status_1 = __importDefault(require("http-status"));
const recorded_device_info_items = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_items_services_1.default.recorded_device_info_items_IntoDb(req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Recorderd Device Info Items',
        data: result,
    });
}));
const findByAlldeviceinfoitems = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_items_services_1.default.findByAlldeviceinfoitemsIntoDb(req.query);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find By All Device Information Items',
        data: result,
    });
}));
const delete_deviceinfoitems = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield device_info_items_services_1.default.delete_deviceinfoitems_IntoDb(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Delete',
        data: result,
    });
}));
const sevice_info_items_controller = {
    recorded_device_info_items,
    findByAlldeviceinfoitems,
    delete_deviceinfoitems
};
exports.default = sevice_info_items_controller;
