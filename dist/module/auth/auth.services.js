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
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../user/user.model"));
const user_constant_1 = require("../user/user.constant");
const jwtHelpers_1 = require("../../app/helper/jwtHelpers");
const config_1 = __importDefault(require("../../app/config"));
const QueryBuilder_1 = __importDefault(require("../../app/builder/QueryBuilder"));
const loginUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const isUserExist = yield user_model_1.default.findOne({
            $and: [
                { email: payload.email },
                { isVerify: true },
                { status: user_constant_1.USER_ACCESSIBILITY.isProgress },
                { isDelete: false },
            ],
        }, { password: 1, _id: 1, isVerify: 1, email: 1, role: 1 }, { session });
        if (!isUserExist) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found', '');
        }
        if (!(yield user_model_1.default.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, isUserExist.password))) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'This Password Not Matched', '');
        }
        const jwtPayload = {
            id: isUserExist.id,
            role: isUserExist.role,
            email: isUserExist.email,
        };
        let accessToken = null;
        if (isUserExist.isVerify) {
            accessToken = jwtHelpers_1.jwtHelpers.generateToken(jwtPayload, config_1.default.jwt_access_secret, config_1.default.expires_in);
        }
        yield session.commitTransaction();
        return {
            accessToken,
        };
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const adminValidationIntoDb = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'not founded admin', '');
        }
        const result = yield (user_model_1.default === null || user_model_1.default === void 0 ? void 0 : user_model_1.default.findOneAndUpdate({ _id: id, isDelete: false }, { isVerify: true, role: user_constant_1.USER_ROLE.admin }, { new: true, upsert: true }));
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, ' issues by the admin  access  section ', '');
        }
        return { status: true, message: '' };
    }
    catch (err) {
        if (err instanceof ApiError_1.default)
            throw err;
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in admin validation service', err.message);
    }
});
const find_by_all_users_IntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allusersQuery = new QueryBuilder_1.default(user_model_1.default.find({ isDelete: false }), query)
            .search(['name', 'email', 'phoneNumber'])
            .filter()
            .sort()
            .paginate()
            .fields();
        const allusers = yield allusersQuery.modelQuery;
        const meta = yield allusersQuery.countTotal();
        return { meta, allusers };
    }
    catch (err) {
        if (err instanceof ApiError_1.default)
            throw err;
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in find_by_all_users_IntoDb', err.message);
    }
});
const socialMediaLoginIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let session = null;
    try {
        session = yield mongoose_1.default.startSession();
        session.startTransaction();
        payload.isVerify = true;
        const updatedUser = yield user_model_1.default.findOneAndUpdate({ email: payload.email, isDelete: false }, { $set: payload }, { new: true, upsert: true, session }).lean();
        if (!updatedUser) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to create or update user', '');
        }
        const jwtPayload = {
            id: updatedUser._id.toString(),
            role: updatedUser.role,
            email: updatedUser.email,
        };
        const accessToken = jwtHelpers_1.jwtHelpers.generateToken(jwtPayload, config_1.default.jwt_access_secret, config_1.default.expires_in);
        const refreshToken = jwtHelpers_1.jwtHelpers.generateToken(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.refresh_expires_in);
        yield session.commitTransaction();
        return { accessToken, refreshToken };
    }
    catch (error) {
        if (session)
            yield session.abortTransaction();
        throw error;
    }
    finally {
        if (session)
            session.endSession();
    }
});
const findMyProfileIntoDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.findById(userId).select("name photo  isVerify picture").lean();
    }
    catch (err) {
        if (err instanceof ApiError_1.default)
            throw err;
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in find My Profile IntoDb', err.message);
    }
});
const myProfileIntoDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.findById(userId).select("-deviceId -isDelete").lean();
    }
    catch (err) {
        if (err instanceof ApiError_1.default)
            throw err;
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error in my Profile IntoDb', err.message);
    }
});
const AuthServices = {
    loginUserIntoDb,
    adminValidationIntoDb,
    find_by_all_users_IntoDb,
    socialMediaLoginIntoDb,
    findMyProfileIntoDb,
    myProfileIntoDb
};
exports.default = AuthServices;
