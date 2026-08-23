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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../app/config"));
const user_constant_1 = require("./user.constant");
const TUserSchema = new mongoose_1.Schema({
    role: {
        type: String,
        enum: Object.values(user_constant_1.USER_ROLE),
        default: user_constant_1.USER_ROLE.user,
        required: [true, 'Role is required'],
    },
    name: { type: String, required: [true, 'Name is required'] },
    password: { type: String, required: [false, 'Password is required'] },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: [false, 'phone number is  not required'],
        unique: true,
    },
    verificationCode: {
        type: Number,
        required: [false, ' verification Code is not required'],
        unique: true,
    },
    isVerify: {
        type: Boolean,
        required: [false, 'is verify not required'],
        default: false,
    },
    status: {
        type: String,
        enum: Object.values(user_constant_1.USER_ACCESSIBILITY),
        default: user_constant_1.USER_ACCESSIBILITY.isProgress,
        required: [true, 'statis is  required'],
    },
    picture: {
        type: String,
        required: [false, 'picture is not required'],
        default: null,
    },
    ipaddress: { type: String, required: [false, 'ipaddress is not required'] },
    browsername: { type: String, required: [false, 'browser name is not required'] },
    device: { type: String, required: [false, 'browser name is not required'] },
    deviceId: { type: String, unique: true, required: [false, 'deviceId required'] },
    provider: {
        type: String,
        enum: ['googleauth', 'facebookauth', 'githubauth', 'emailpassword'],
        default: 'googleauth',
    },
    engine: { type: String, required: false },
    os: { type: String, required: false },
    platform: { type: String, required: false },
    address: { type: String, required: false },
    isDelete: {
        type: Boolean,
        default: false,
        required: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Remove password from JSON
TUserSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});
// Hash password before save
TUserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password') && user.password) {
            user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        }
        next();
    });
});
// Clear password after save
TUserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
// Exclude soft-deleted docs
TUserSchema.pre('find', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
TUserSchema.pre('findOne', function (next) {
    this.findOne({ isDelete: { $ne: true } });
    next();
});
TUserSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
    next();
});
// Static methods
TUserSchema.statics.isUserExistByCustomId = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield users.findOne({ id });
    });
};
TUserSchema.statics.isPasswordMatched = function (plainTextPassword, hashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(plainTextPassword, hashPassword);
    });
};
TUserSchema.statics.isJWTIssuesBeforePasswordChange = function (passwordChangeTimestamp, jwtIssuesTime) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordChangeTime = new Date(passwordChangeTimestamp).getTime() / 1000;
        return passwordChangeTime > jwtIssuesTime;
    });
};
const users = (0, mongoose_1.model)('users', TUserSchema);
exports.default = users;
