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
const ApiError_1 = __importDefault(require("../../app/error/ApiError"));
const iplocation_model_1 = __importDefault(require("./iplocation.model"));
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
const iplocation_model_2 = __importDefault(require("./iplocation.model"));
function recordIpLocationIntoDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { visitorId, ipLocation } = payload;
            const updated = yield iplocation_model_1.default.findOneAndUpdate({ visitorId, isDelete: false }, { visitorId, ipLocation }, {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            })
                .lean()
                .exec();
            if (!updated) {
                throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to record IP location', '');
            }
            return { status: true, message: 'IP location recorded successfully' };
        }
        catch (err) {
            if (err instanceof ApiError_1.default)
                throw err;
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in recordIpLocation service', err.message);
        }
    });
}
const findByAllIplocationtoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const iplocationsQuery = new QueryBuilder_1.default(iplocation_model_2.default.find({ isDelete: false }), query)
            .search(['visitorId', 'city'])
            .filter()
            .sort()
            .paginate()
            .fields();
        const all_iplocations = yield iplocationsQuery.modelQuery;
        const meta = yield iplocationsQuery.countTotal();
        return { meta, all_iplocations };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error find By All Iplocation toDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const specificFindByIpLocationIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield iplocation_model_2.default.findById(id).select('-updatedAt -createdAt');
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error find By All Iplocation toDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const delete_iplocations_IntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield iplocation_model_2.default.findByIdAndDelete(id);
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'issues by the delete section', '');
        }
        return { status: true, message: 'successfully  delete' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error delete_iplocations_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const iplocation_services = {
    recordIpLocationIntoDb,
    findByAllIplocationtoDb,
    delete_iplocations_IntoDb,
    specificFindByIpLocationIntoDb,
};
exports.default = iplocation_services;
