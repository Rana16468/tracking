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
const iplocation_services_1 = __importDefault(require("./iplocation.services"));
const sendRespone_1 = __importDefault(require("../../utility/sendRespone"));
const http_status_1 = __importDefault(require("http-status"));
const recordedIpLocation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield iplocation_services_1.default.recordIpLocationIntoDb(req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Recorderd IP Location',
        data: result,
    });
}));
const findByAllIplocation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield iplocation_services_1.default.findByAllIplocationtoDb(req.query);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find By All IpLocation',
        data: result,
    });
}));
const delete_iplocations = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield iplocation_services_1.default.delete_iplocations_IntoDb(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Delete',
        data: result,
    });
}));
const specificFindByIpLocation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield iplocation_services_1.default.specificFindByIpLocationIntoDb(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully Find By IpLocation',
        data: result,
    });
}));
const iplocation_controller = {
    recordedIpLocation,
    findByAllIplocation,
    delete_iplocations,
    specificFindByIpLocation
};
exports.default = iplocation_controller;
