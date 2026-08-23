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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TDeviceInfoSchema = new mongoose_1.Schema({
    visitorId: {
        type: String,
        required: [true, 'visitorId is required'],
        trim: true,
        unique: true
    },
    browser: {
        type: String,
        required: [true, 'browser is required'],
    },
    device: {
        type: String,
        required: [true, 'device is required'],
    },
    os: {
        type: String,
        required: [true, 'OS is required'],
    },
    version: {
        type: String,
        required: [true, 'version is required'],
    },
    isDelete: {
        type: Boolean,
        required: [false, 'isDelete is required'],
        default: false,
    },
}, {
    timestamps: true,
});
TDeviceInfoSchema.pre('find', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
TDeviceInfoSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
    next();
});
TDeviceInfoSchema.pre('findOne', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
TDeviceInfoSchema.statics.IsDeviceInfoExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ visitorId: id, isDelete: false });
    });
};
const deviceInfos = (0, mongoose_1.model)('deviceInfos', TDeviceInfoSchema);
exports.default = deviceInfos;
