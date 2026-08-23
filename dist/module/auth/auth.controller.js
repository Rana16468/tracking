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
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const auth_services_1 = __importDefault(require("./auth.services"));
const sendRespone_1 = __importDefault(require("../../utility/sendRespone"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../app/config"));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.default.loginUserIntoDb(req.body);
    (0, sendRespone_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Successfully Login',
        data: result,
    });
}));
const adminValidation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.default.adminValidationIntoDb(req.user.id, req.params.id);
    (0, sendRespone_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Successfully Provided Admin Access',
        data: result,
    });
}));
const find_by_all_users = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.default.find_by_all_users_IntoDb(req.query);
    (0, sendRespone_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Successfully Find By All Users',
        data: result,
    });
}));
const socialMediaLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.default.socialMediaLoginIntoDb(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.NODE_ENV === 'production',
        httpOnly: true,
    });
    (0, sendRespone_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Successfully Login',
        data: { accessToken },
    });
}));
const findMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.default.findMyProfileIntoDb(req.user.id);
    (0, sendRespone_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Successfully Find My Profile',
        data: result
    });
}));
const myProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.default.myProfileIntoDb(req.user.id);
    (0, sendRespone_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Successfully Find My Profile',
        data: result
    });
}));
const AuthController = {
    loginUser,
    adminValidation,
    find_by_all_users,
    socialMediaLogin,
    findMyProfile,
    myProfile
};
exports.default = AuthController;
