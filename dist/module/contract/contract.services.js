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
exports.ContractService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const dayjs_1 = __importDefault(require("dayjs"));
const contract_model_1 = require("./contract.model");
const ApiError_1 = __importDefault(require("../../app/error/ApiError"));
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
const createContractIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceId } = payload;
    const startOfDay = (0, dayjs_1.default)().startOf('day').toDate();
    const endOfDay = (0, dayjs_1.default)().endOf('day').toDate();
    const alreadyPosted = yield contract_model_1.Contract.findOne({
        deviceId,
        createdAt: { $gte: startOfDay, $lte: endOfDay },
    });
    if (alreadyPosted) {
        return {
            status: false,
            message: 'This device has already submitted a contract today.',
        };
    }
    const newContract = new contract_model_1.Contract(payload);
    const result = yield newContract.save();
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'issues by the contract recorded section', '');
    }
    return {
        status: true,
        message: 'successfully recorded',
    };
});
const AllContractIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allContractQuery = new QueryBuilder_1.default(contract_model_1.Contract.find({}), query)
            .search(['name', 'email', 'phoneNumber', 'address'])
            .filter()
            .sort()
            .paginate()
            .fields();
        const all_contract = yield allContractQuery.modelQuery;
        const meta = yield allContractQuery.countTotal();
        return { meta, all_contract };
    }
    catch (error) {
        throw new ApiError_1.default((error === null || error === void 0 ? void 0 : error.statusCode) || http_status_1.default.SERVICE_UNAVAILABLE, (error === null || error === void 0 ? void 0 : error.message) || 'Failed to fetch all contracts', error);
    }
});
const SpecificContractIdIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contract_model_1.Contract.findById(id);
    return result;
});
const UpdateContractFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield contract_model_1.Contract.findById(id);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User Not Exist in System', '');
    }
    const result = yield contract_model_1.Contract.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const DeleteContractFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield contract_model_1.Contract.findById(id);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User Not Exist in the System', '');
    }
    const result = yield contract_model_1.Contract.updateOne({ _id: id }, { isDelete: true });
    return result;
});
const FavoriteContrcatFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield contract_model_1.Contract.findById(id);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User Not Exist in the System', '');
    }
    const result = yield contract_model_1.Contract.updateOne({ _id: id }, { isfavorite: (isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.isfavorite) ? false : true });
    return result;
});
exports.ContractService = {
    createContractIntoDb,
    AllContractIntoDb,
    SpecificContractIdIntoDb,
    UpdateContractFromDb,
    DeleteContractFromDb,
    FavoriteContrcatFromDb,
};
