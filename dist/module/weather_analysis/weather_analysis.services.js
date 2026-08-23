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
const weather_analysis_model_1 = __importDefault(require("./weather_analysis.model"));
const weather_analysis_model_2 = __importDefault(require("./weather_analysis.model"));
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
function recorded_wather_info_intodb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { visitorId, location, current } = payload;
            const updated = yield weather_analysis_model_1.default.findOneAndUpdate({ visitorId, isDelete: false }, { visitorId, location, current }, {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            })
                .lean()
                .exec();
            if (!updated) {
                throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to record weather data', '');
            }
            return { status: true, message: 'Weather data recorded successfully' };
        }
        catch (err) {
            if (err instanceof ApiError_1.default)
                throw err;
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in recordWeatherInfo service', err.message);
        }
    });
}
const findByAllWeatherAanlysistoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weatherAnalysisQuery = new QueryBuilder_1.default(weather_analysis_model_2.default.find({ isDelete: false }), query)
            .search([
            'visitorId',
            'location.name',
            'location.region',
            'location.country',
            'location.tz_id',
        ])
            .filter()
            .sort()
            .paginate()
            .fields();
        const all_weather_analysis = yield weatherAnalysisQuery.modelQuery;
        const meta = yield weatherAnalysisQuery.countTotal();
        return { meta, all_weather_analysis };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error findByAllWeatherAanlysistoDb ', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const delete_weather_anlysis_IntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield weather_analysis_model_2.default.findByIdAndDelete(id);
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'issues by the delete section', '');
        }
        return { status: true, message: 'successfully  delete' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error  delete_weather_anlysis_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const find_by_specific_weather_analysis_IntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield weather_analysis_model_2.default.findById(id);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error  find_by_specific_weather_analysis', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const weather_analysis_services = {
    recorded_wather_info_intodb,
    findByAllWeatherAanlysistoDb,
    delete_weather_anlysis_IntoDb,
    find_by_specific_weather_analysis_IntoDb,
};
exports.default = weather_analysis_services;
