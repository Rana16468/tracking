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
const user_model_1 = __importDefault(require("./user.model"));
const user_constant_1 = require("./user.constant");
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../app/config"));
const tracking_model_1 = __importDefault(require("../tracking/tracking.model"));
const weather_analysis_model_1 = __importDefault(require("../weather_analysis/weather_analysis.model"));
const iplocation_model_1 = __importDefault(require("../iplocation/iplocation.model"));
const device_info_model_1 = __importDefault(require("../device_info/device_info.model"));
const device_info_items_model_1 = __importDefault(require("../device_info_items/device_info_items.model"));
const browser_details_model_1 = __importDefault(require("../browser_details/browser_details.model"));
const generateUniqueOTP = () => __awaiter(void 0, void 0, void 0, function* () {
    const MAX_ATTEMPTS = 10;
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const otp = Math.floor(10000 + Math.random() * 90000);
        const existingUser = yield user_model_1.default.findOne({ verificationCode: otp });
        if (!existingUser) {
            return otp;
        }
    }
    throw new ApiError_1.default(http_status_1.default.NOT_EXTENDED, 'Failed to generate a unique OTP after multiple attempts', '');
});
const createUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const otp = yield generateUniqueOTP();
        const isExistUser = yield user_model_1.default.findOne({
            $and: [
                {
                    email: payload.email,
                    isDelete: false,
                    isVerify: true,
                    status: user_constant_1.USER_ACCESSIBILITY.isProgress,
                },
            ],
        }, { _id: 1, email: 1, phoneNumber: 1, role: 1 });
        payload.verificationCode = otp;
        payload.phoneNumber = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        if (isExistUser) {
            throw new ApiError_1.default(http_status_1.default.FOUND, 'this email alredy exist in our database', '');
        }
        const authBuilder = new user_model_1.default(payload);
        const result = yield authBuilder.save({ session });
        // await sendEmail(
        //   payload.email,
        //   emailcontext.sendvarificationData(
        //     payload.email,
        //     otp,
        //     'User Verification Email',
        //   ),
        //   'Verification OTP Code',
        // );
        yield session.commitTransaction();
        session.endSession();
        return result && { status: true, message: 'checked your email box' };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new ApiError_1.default(http_status_1.default.SERVICE_UNAVAILABLE, 'server unavailable', error);
    }
});
const chnagePasswordIntoDb = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUserExist = yield user_model_1.default.findOne({
            $and: [
                { _id: id },
                { isVerify: true },
                { status: user_constant_1.USER_ACCESSIBILITY.isProgress },
                { isDelete: false },
            ],
        }, { password: 1 });
        ;
        if (!isUserExist) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found', '');
        }
        if (!(yield user_model_1.default.isPasswordMatched(payload.oldpassword, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password))) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Old password does not match', '');
        }
        const newHashedPassword = yield bcrypt_1.default.hash(payload.newpassword, Number(config_1.default.bcrypt_salt_rounds));
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(id, { password: newHashedPassword }, { new: true, upsert: true });
        if (!updatedUser) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'password  change database error', '');
        }
        return {
            success: true,
            message: 'Password updated successfully',
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.SERVICE_UNAVAILABLE, 'Password change failed', error);
    }
});
const delete_admin_userIntoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.default.findByIdAndDelete(id);
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'issues by the admin delete section error', '');
        }
        return { status: true, message: 'successfully delete' };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.SERVICE_UNAVAILABLE, 'delete_admin_userIntoDb failed', error);
    }
});
const delete_full_data_set_IntoDb = (visitorId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        yield Promise.all([
            tracking_model_1.default.deleteOne({ visitorId }).session(session),
            weather_analysis_model_1.default.deleteOne({ visitorId }).session(session),
            iplocation_model_1.default.deleteOne({ visitorId }).session(session),
            device_info_model_1.default.deleteOne({ visitorId }).session(session),
            device_info_items_model_1.default.deleteOne({ visitorId }).session(session),
            browser_details_model_1.default.deleteOne({ visitorId }).session(session),
        ]);
        yield session.commitTransaction();
        session.endSession();
        return {
            status: true,
            message: 'All visitor data deleted successfully',
        };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new ApiError_1.default(http_status_1.default.SERVICE_UNAVAILABLE, 'Failed to delete full data set', error.message || error);
    }
});
const UserServices = {
    createUserIntoDb,
    chnagePasswordIntoDb,
    delete_admin_userIntoDb,
    delete_full_data_set_IntoDb,
};
exports.default = UserServices;
