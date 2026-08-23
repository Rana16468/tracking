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
const http_status_1 = __importDefault(require("http-status"));
const node_cache_1 = __importDefault(require("node-cache"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../app/error/ApiError"));
const tracking_model_1 = __importDefault(require("../tracking/tracking.model"));
const browser_details_model_1 = __importDefault(require("./browser_details.model"));
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
const cache = new node_cache_1.default({ stdTTL: 60 * 60 });
const createDetailsIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitorId = payload.visitorId.trim();
        const cacheKey = `timezone:${visitorId}`;
        let timeZoneId = cache.get(cacheKey);
        if (!timeZoneId) {
            const existingTZ = yield tracking_model_1.default.findOne({
                visitorId,
                isDelete: false,
            });
            if (!existingTZ) {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Time zone not found', '');
            }
            timeZoneId = existingTZ._id.toString();
            cache.set(cacheKey, timeZoneId);
        }
        payload.timeZoneId = new mongoose_1.default.Types.ObjectId(timeZoneId);
        const result = yield browser_details_model_1.default.findOneAndUpdate({ visitorId, isDelete: false }, { $set: payload }, { new: true, upsert: true });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Failed to record browser details', '');
        }
        return {
            status: true,
            message: 'Successfully recorded',
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in createDetailsIntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const findByAllbrowserdetailsIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browserdetailsQuery = new QueryBuilder_1.default(browser_details_model_1.default.find({ isDelete: false }), query)
            .search(['visitorId', "_id", "timezone", "platform"])
            .filter()
            .sort()
            .paginate()
            .fields();
        const all_browserdetails = yield browserdetailsQuery.modelQuery;
        const meta = yield browserdetailsQuery.countTotal();
        return { meta, all_browserdetails };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error findByAllDeviceInfoIntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const find_by_specific_browser_details_IntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield browser_details_model_1.default
            .findById(id)
            .select('-updatedAt -createdAt');
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'not founded', '');
        }
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error findByAllDeviceInfoIntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const delete_browser_details_IntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield browser_details_model_1.default.findByIdAndDelete(id);
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'issues by the delete section', '');
        }
        return { status: true, message: 'successfully  delete' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error delete_browser_details_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
exports.default = {
    createDetailsIntoDb,
    findByAllbrowserdetailsIntoDb,
    find_by_specific_browser_details_IntoDb,
    delete_browser_details_IntoDb,
};
