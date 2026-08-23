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
const tracking_services_1 = __importDefault(require("./tracking.services"));
const sendRespone_1 = __importDefault(require("../../utility/sendRespone"));
const http_status_1 = __importDefault(require("http-status"));
const createTimeZone = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tracking_services_1.default.createTimeZoneIntoDb(req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully recorded timezone',
        data: result,
    });
}));
const findByAllTimeZone = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tracking_services_1.default.findByAllTimeZoneIntoDb(req.query);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully retrieved timezones',
        data: result,
    });
}));
const delete_timezones = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tracking_services_1.default.delete_timezones_IntoDb(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully deleted timezone record',
        data: result,
    });
}));
const find_by_specific_timezones = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tracking_services_1.default.find_by_specific_timezones_IntoDb(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully retrieved specific timezone record',
        data: result,
    });
}));
const allCountryCreateIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tracking_services_1.default.allCountryCreateIntoDB();
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully fetched country data',
        data: result,
    });
}));
const importAllCountries = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tracking_services_1.default.importAllCountriesIntoDb();
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully imported country data',
        data: result,
    });
}));
const createCountry = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tracking_services_1.default.createCountryIntoDb(req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully created or updated country',
        data: result,
    });
}));
const findByAllCountry = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tracking_services_1.default.findByAllCountryIntoDb(req.query);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully fetched countries',
        data: result,
    });
}));
const find_by_specific_country = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tracking_services_1.default.find_by_specific_country_IntoDb(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully fetched country',
        data: result,
    });
}));
const update_country = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tracking_services_1.default.update_country_IntoDb(req.params.id, req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully updated country',
        data: result,
    });
}));
const delete_country = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tracking_services_1.default.delete_country_IntoDb(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully deleted country',
        data: result,
    });
}));
const TimeZoneController = {
    createTimeZone,
    findByAllTimeZone,
    delete_timezones,
    find_by_specific_timezones,
    allCountryCreateIntoDB,
    importAllCountries,
    createCountry,
    findByAllCountry,
    find_by_specific_country,
    update_country,
    delete_country,
};
exports.default = TimeZoneController;
