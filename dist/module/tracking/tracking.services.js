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
const ApiError_1 = __importDefault(require("../../app/error/ApiError"));
const tracking_model_1 = __importDefault(require("./tracking.model"));
const tracking_country_model_1 = __importDefault(require("./tracking.country.model"));
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
const timeZoneCache = new node_cache_1.default({ stdTTL: 60 * 60 });
const createTimeZoneIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = `timezone:${payload.visitorId}`;
        const cachedResult = timeZoneCache.get(cacheKey);
        if (cachedResult) {
            return cachedResult;
        }
        const timeZone = yield tracking_model_1.default.findOneAndUpdate({ visitorId: payload.visitorId, isDelete: false }, { $set: payload }, { new: true, upsert: true });
        if (!timeZone) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Failed to create or update timezone record.', '');
        }
        const response = {
            status: true,
            message: 'Timezone successfully recorded',
        };
        timeZoneCache.set(cacheKey, response);
        return response;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error occurred while recording timezone.', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const findByAllTimeZoneIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specificUserResaleHistoryQuery = new QueryBuilder_1.default(tracking_model_1.default.find({ isDelete: false }), query)
            .search(['visitorId', '_id'])
            .filter()
            .sort()
            .paginate()
            .fields();
        const all_resale_history = yield specificUserResaleHistoryQuery.modelQuery;
        const meta = yield specificUserResaleHistoryQuery.countTotal();
        return { meta, all_resale_history };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error find By All TimeZone', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const delete_timezones_IntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tracking_model_1.default.findByIdAndDelete(id);
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'issues by the delete section', '');
        }
        return { status: true, message: 'successfully  delete' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error delete_timezones_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const find_by_specific_timezones_IntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield tracking_model_1.default.findById(id);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error find_by_specific_timezones_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const createCountryIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tracking_country_model_1.default.findOneAndUpdate({ uuid: payload.uuid, isDelete: false }, { $set: Object.assign(Object.assign({}, payload), { isDelete: false }) }, { new: true, upsert: true });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Failed to create or update country record.', '');
        }
        return { status: true, message: 'Country successfully recorded' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error occurred while recording country.', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const findByAllCountryIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countryQuery = new QueryBuilder_1.default(tracking_country_model_1.default.find({ isDelete: false }), query)
            .search(['uuid', 'region', 'subregion'])
            .filter()
            .sort()
            .paginate()
            .fields();
        const all_countries = yield countryQuery.modelQuery;
        const meta = yield countryQuery.countTotal();
        return { meta, all_countries };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error find By All Country', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const find_by_specific_country_IntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tracking_country_model_1.default.findById(id).select('-updatedAt -createdAt');
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'not founded', '');
        }
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error find_by_specific_country_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const update_country_IntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tracking_country_model_1.default.findByIdAndUpdate(id, { $set: payload }, { new: true });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'not founded', '');
        }
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error update_country_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const delete_country_IntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tracking_country_model_1.default.findByIdAndDelete(id);
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'issues by the delete section', '');
        }
        return { status: true, message: 'successfully delete' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error delete_country_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const allCountryCreateIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const API_KEY = 'rc_live_35bec5ef8fbb4bb89040b08008184ac7';
    const BASE_URL = 'https://api.restcountries.com/countries/v5';
    try {
        const offsets = [0, 100, 200];
        const requests = offsets.map((offset) => fetch(`${BASE_URL}?limit=100&offset=${offset}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            if (!res.ok) {
                throw new Error(`Country API returned status ${res.status}`);
            }
            return res.json();
        })));
        const responses = yield Promise.all(requests);
        const countriesData = responses.flatMap((item) => {
            if (Array.isArray(item)) {
                return item;
            }
            if (item && Array.isArray(item.data)) {
                return item.data;
            }
            return [];
        });
        return countriesData;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error fetching country data', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const importAllCountriesIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countriesData = yield allCountryCreateIntoDB();
        if (!Array.isArray(countriesData) || countriesData.length === 0) {
            return { status: true, message: 'No countries available to import', data: [] };
        }
        const operations = countriesData
            .filter((country) => country === null || country === void 0 ? void 0 : country.uuid)
            .map((country) => ({
            updateOne: {
                filter: { uuid: country.uuid, isDelete: false },
                update: { $set: Object.assign(Object.assign({}, country), { isDelete: false }) },
                upsert: true,
            },
        }));
        if (operations.length === 0) {
            return { status: true, message: 'No valid country records to import', data: [] };
        }
        const result = yield tracking_country_model_1.default.bulkWrite(operations);
        return {
            status: true,
            message: 'Countries imported successfully',
            data: {
                insertedCount: result.upsertedCount,
                modifiedCount: result.modifiedCount,
            },
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error importing country data', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const TimeZoneServices = {
    createTimeZoneIntoDb,
    findByAllTimeZoneIntoDb,
    delete_timezones_IntoDb,
    find_by_specific_timezones_IntoDb,
    createCountryIntoDb,
    findByAllCountryIntoDb,
    find_by_specific_country_IntoDb,
    update_country_IntoDb,
    delete_country_IntoDb,
    allCountryCreateIntoDB,
    importAllCountriesIntoDb,
};
exports.default = TimeZoneServices;
