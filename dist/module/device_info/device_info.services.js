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
const device_info_model_1 = __importDefault(require("./device_info.model"));
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
const user_model_1 = __importDefault(require("../user/user.model"));
const tracking_model_1 = __importDefault(require("../tracking/tracking.model"));
const weather_analysis_model_1 = __importDefault(require("../weather_analysis/weather_analysis.model"));
const iplocation_model_1 = __importDefault(require("../iplocation/iplocation.model"));
const device_info_items_model_1 = __importDefault(require("../device_info_items/device_info_items.model"));
const contract_model_1 = require("../contract/contract.model");
const browser_details_model_1 = __importDefault(require("../browser_details/browser_details.model"));
const monthNames_1 = __importDefault(require("../../utility/monthNames"));
const recorded_device_Info_IntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield device_info_model_1.default.findOneAndUpdate({ visitorId: payload === null || payload === void 0 ? void 0 : payload.visitorId, isDelete: false }, { $set: payload }, { new: true, upsert: true });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Failed to create or update  device Information section.', '');
        }
        return {
            status: true,
            message: 'successfully recorded',
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in recorded_device_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const findByAllDeviceInfoIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deviceinfosQuery = new QueryBuilder_1.default(device_info_model_1.default.find({ isDelete: false }), query)
            .search(['visitorId', 'browser', 'device', 'os'])
            .filter()
            .sort()
            .paginate()
            .fields();
        const all_deviceinfo = yield deviceinfosQuery.modelQuery;
        const meta = yield deviceinfosQuery.countTotal();
        return { meta, all_deviceinfo };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error findByAllDeviceInfoIntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const delete_deviceInfos_IntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield device_info_model_1.default.findByIdAndDelete(id);
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'issues by the delete section', '');
        }
        return { status: true, message: 'successfully  delete' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error delete_browser_details_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const dashboard_infomation_IntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collections = [
            { key: 'totalUsers', model: user_model_1.default },
            { key: 'totalTimezones', model: tracking_model_1.default },
            { key: 'totalppweathers', model: weather_analysis_model_1.default },
            { key: 'totalIplocations', model: iplocation_model_1.default },
            { key: 'totalDeviceinfos', model: device_info_model_1.default },
            { key: 'totalDeviceinfoitems', model: device_info_items_model_1.default },
            { key: 'totalContracts', model: contract_model_1.Contract },
            { key: 'totalBrowserdetails', model: browser_details_model_1.default },
        ];
        const counts = yield Promise.all(collections.map(({ model }) => model.countDocuments()));
        const result = collections.reduce((acc, { key }, index) => {
            acc[key] = counts[index];
            return acc;
        }, {});
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error dashboard_infomation_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const dashboard_timezone_graph_IntoDb = (year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetYear = Number(year) || new Date().getFullYear();
        const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
        const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);
        const result = yield tracking_model_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lt: endDate },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    month: '$_id',
                    userCount: '$count',
                    _id: 0,
                },
            },
        ]);
        const monthlyData = monthNames_1.default.map((month, index) => {
            const data = result.find((r) => r.month === index + 1);
            return {
                month,
                userCount: (data === null || data === void 0 ? void 0 : data.userCount) || 0,
            };
        });
        return {
            success: true,
            message: `Successfully fetched timezone graph for ${targetYear}`,
            data: monthlyData,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in dashboard_timezone_graph_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const dashboard_ipweathers_graph_IntoDb = (year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetYear = Number(year) || new Date().getFullYear();
        const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
        const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);
        const result = yield weather_analysis_model_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lt: endDate },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    month: '$_id',
                    userCount: '$count',
                    _id: 0,
                },
            },
        ]);
        const monthlyData = monthNames_1.default.map((month, index) => {
            const data = result.find((r) => r.month === index + 1);
            return {
                month,
                userCount: (data === null || data === void 0 ? void 0 : data.userCount) || 0,
            };
        });
        return {
            success: true,
            message: `Successfully fetched timezone graph for ${targetYear}`,
            data: monthlyData,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in dashboard_timezone_graph_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const dashboard_iplocations_graph_IntoDb = (year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetYear = Number(year) || new Date().getFullYear();
        const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
        const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);
        const result = yield iplocation_model_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lt: endDate },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    month: '$_id',
                    userCount: '$count',
                    _id: 0,
                },
            },
        ]);
        const monthlyData = monthNames_1.default.map((month, index) => {
            const data = result.find((r) => r.month === index + 1);
            return {
                month,
                userCount: (data === null || data === void 0 ? void 0 : data.userCount) || 0,
            };
        });
        return {
            success: true,
            message: `Successfully fetched iplocations graph for ${targetYear}`,
            data: monthlyData,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in dashboard_iplocations_graph_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const dashboard_deviceinfos_graph_IntoDb = (year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetYear = Number(year) || new Date().getFullYear();
        const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
        const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);
        const result = yield device_info_model_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lt: endDate },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    month: '$_id',
                    userCount: '$count',
                    _id: 0,
                },
            },
        ]);
        const monthlyData = monthNames_1.default.map((month, index) => {
            const data = result.find((r) => r.month === index + 1);
            return {
                month,
                userCount: (data === null || data === void 0 ? void 0 : data.userCount) || 0,
            };
        });
        return {
            success: true,
            message: `Successfully fetched deviceinfos graph for ${targetYear}`,
            data: monthlyData,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in dashboard deviceinfos_graph_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const dashboard_deviceinfoitems_graph_IntoDb = (year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetYear = Number(year) || new Date().getFullYear();
        const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
        const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);
        const result = yield device_info_items_model_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lt: endDate },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    month: '$_id',
                    userCount: '$count',
                    _id: 0,
                },
            },
        ]);
        const monthlyData = monthNames_1.default.map((month, index) => {
            const data = result.find((r) => r.month === index + 1);
            return {
                month,
                userCount: (data === null || data === void 0 ? void 0 : data.userCount) || 0,
            };
        });
        return {
            success: true,
            message: `Successfully fetched deviceinfoitems graph for ${targetYear}`,
            data: monthlyData,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in dashboard deviceinfos_graph_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const dashboard_browserdetails_graph_IntoDb = (year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetYear = Number(year) || new Date().getFullYear();
        const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
        const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);
        const result = yield browser_details_model_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lt: endDate },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    month: '$_id',
                    userCount: '$count',
                    _id: 0,
                },
            },
        ]);
        const monthlyData = monthNames_1.default.map((month, index) => {
            const data = result.find((r) => r.month === index + 1);
            return {
                month,
                userCount: (data === null || data === void 0 ? void 0 : data.userCount) || 0,
            };
        });
        return {
            success: true,
            message: `Successfully fetched browserdetails graph for ${targetYear}`,
            data: monthlyData,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in dashboard browserdetails_graph_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
//contracts
const dashboard_contracts_graph_IntoDb = (year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetYear = Number(year) || new Date().getFullYear();
        const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
        const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);
        const result = yield contract_model_1.Contract.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lt: endDate },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    month: '$_id',
                    userCount: '$count',
                    _id: 0,
                },
            },
        ]);
        const monthlyData = monthNames_1.default.map((month, index) => {
            const data = result.find((r) => r.month === index + 1);
            return {
                month,
                userCount: (data === null || data === void 0 ? void 0 : data.userCount) || 0,
            };
        });
        return {
            success: true,
            message: `Successfully fetched contracts graph for ${targetYear}`,
            data: monthlyData,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in dashboard contracts_graph_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const dashboard_users_graph_IntoDb = (year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetYear = Number(year) || new Date().getFullYear();
        const startDate = new Date(`${targetYear}-01-01T00:00:00Z`);
        const endDate = new Date(`${targetYear + 1}-01-01T00:00:00Z`);
        const result = yield user_model_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lt: endDate },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    month: '$_id',
                    userCount: '$count',
                    _id: 0,
                },
            },
        ]);
        const monthlyData = monthNames_1.default.map((month, index) => {
            const data = result.find((r) => r.month === index + 1);
            return {
                month,
                userCount: (data === null || data === void 0 ? void 0 : data.userCount) || 0,
            };
        });
        return {
            success: true,
            message: `Successfully fetched contracts graph for ${targetYear}`,
            data: monthlyData,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in dashboard contracts_graph_IntoDb', (error === null || error === void 0 ? void 0 : error.message) || error);
    }
});
const device_Info_services = {
    recorded_device_Info_IntoDb,
    findByAllDeviceInfoIntoDb,
    delete_deviceInfos_IntoDb,
    dashboard_infomation_IntoDb,
    dashboard_timezone_graph_IntoDb,
    dashboard_ipweathers_graph_IntoDb,
    dashboard_iplocations_graph_IntoDb,
    dashboard_deviceinfos_graph_IntoDb,
    dashboard_deviceinfoitems_graph_IntoDb,
    dashboard_browserdetails_graph_IntoDb,
    dashboard_contracts_graph_IntoDb,
    dashboard_users_graph_IntoDb,
};
exports.default = device_Info_services;
