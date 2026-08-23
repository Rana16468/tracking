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
exports.cache = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../app/error/ApiError"));
const country_model_1 = __importDefault(require("./country.model"));
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
const node_cache_1 = __importDefault(require("node-cache"));
const createCountryIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield country_model_1.default.findOneAndUpdate({ uuid: payload.uuid, isDelete: false }, { $set: payload }, { new: true, upsert: true });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Failed to create or update country.', '');
        }
        return { status: true, message: 'Country saved successfully' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error occurred while saving country.', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
exports.cache = new node_cache_1.default({
    stdTTL: 300, // 5 minutes
    checkperiod: 320,
});
const findAllCountriesIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = `countries:${JSON.stringify(query)}`;
        // Check cache first
        const cachedData = exports.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const countriesQuery = new QueryBuilder_1.default(country_model_1.default.find({}), query)
            .search([
            "name",
            "alpha2Code",
            "alpha3Code",
            "subregion",
            "region",
            "demonym",
            "nativeName",
            "numericCode",
            "capital",
            "flag",
            "population",
            "area",
            "languages",
            "currencies",
            "timezones",
            "callingCodes",
            "altSpellings",
        ])
            .filter()
            .sort()
            .fields();
        const countries = yield countriesQuery.modelQuery;
        const meta = yield countriesQuery.countTotal();
        const response = { meta, countries };
        // Store in cache for 5 minutes
        exports.cache.set(cacheKey, response);
        return response;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Error fetching countries.", (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const findCountryByIdIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const country = yield country_model_1.default.findById(id);
        if (!country) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Country not found.', '');
        }
        return country;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error fetching country by id.', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const updateCountryIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const country = yield country_model_1.default.findByIdAndUpdate(id, payload, {
            new: true,
        });
        if (!country) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Country not found.', '');
        }
        return { status: true, message: 'Country updated successfully' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error updating country.', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const deleteCountryIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const country = yield country_model_1.default.findByIdAndUpdate(id, { isDelete: true }, { new: true });
        if (!country) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Country not found.', '');
        }
        return { status: true, message: 'Country deleted successfully' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error deleting country.', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const CountryServices = {
    createCountryIntoDb,
    findAllCountriesIntoDb,
    findCountryByIdIntoDb,
    updateCountryIntoDb,
    deleteCountryIntoDb,
};
exports.default = CountryServices;
