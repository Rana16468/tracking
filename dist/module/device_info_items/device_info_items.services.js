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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../app/error/ApiError"));
const device_info_items_model_1 = __importDefault(require("./device_info_items.model"));
const device_info_items_model_2 = __importDefault(require("./device_info_items.model"));
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
function recorded_device_info_items_IntoDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { visitorId } = payload, info = __rest(payload, ["visitorId"]);
            const updated = yield device_info_items_model_1.default.findOneAndUpdate({ visitorId }, Object.assign({ visitorId }, info), {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            })
                .lean()
                .exec();
            if (!updated) {
                throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to record device info', '');
            }
            return {
                status: true,
                message: 'Device information recorded successfully',
            };
        }
        catch (err) {
            if (err instanceof ApiError_1.default)
                throw err;
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in recordDeviceInfo service', err.message);
        }
    });
}
const findByAlldeviceinfoitemsIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deviceinfoitemsQuery = new QueryBuilder_1.default(device_info_items_model_2.default.find({ isDelete: false }), query)
            .search([
            'visitorId',
            'colorDepth',
            'connectionType',
            'deviceMemory',
            'platform',
            'screenResolution',
            'timezone',
        ])
            .filter()
            .sort()
            .paginate()
            .fields();
        const all_deviceinfoitems = yield deviceinfoitemsQuery.modelQuery;
        const meta = yield deviceinfoitemsQuery.countTotal();
        return { meta, all_deviceinfoitems };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error findByAllDeviceInfoIntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const delete_deviceinfoitems_IntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield device_info_items_model_2.default.findByIdAndDelete(id);
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'issues by the delete section', '');
        }
        return { status: true, message: 'successfully  delete' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error delete_deviceinfoitems_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const sevice_info_items_services = {
    recorded_device_info_items_IntoDb,
    findByAlldeviceinfoitemsIntoDb,
    delete_deviceinfoitems_IntoDb,
};
exports.default = sevice_info_items_services;
