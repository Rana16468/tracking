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
const TDeviceInfoItemsSchema = new mongoose_1.Schema({
    visitorId: {
        type: String,
        required: [true, 'visitorId is required'],
        trim: true,
        unique: true,
    },
    colorDepth: {
        type: Number,
        required: [true, 'colorDepth is required'],
    },
    connectionType: {
        type: String,
        required: [true, 'connectionType is required'],
        trim: true,
    },
    deviceMemory: {
        type: Number,
        required: [true, 'deviceMemory is required'],
    },
    hardwareConcurrency: {
        type: Number,
        required: [true, 'hardwareConcurrency is required'],
    },
    language: {
        type: String,
        required: [true, 'language is required'],
        trim: true,
    },
    platform: {
        type: String,
        required: [true, 'platform is required'],
        trim: true,
    },
    screenResolution: {
        type: String,
        required: [true, 'screenResolution is required'],
        trim: true,
    },
    timezone: {
        type: String,
        required: [true, 'timezone is required'],
        trim: true,
    },
    touchSupport: {
        type: Boolean,
        required: [true, 'touchSupport is required'],
    },
    userAgent: {
        type: String,
        required: [true, 'userAgent is required'],
        trim: true,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
TDeviceInfoItemsSchema.pre('find', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
TDeviceInfoItemsSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
    next();
});
TDeviceInfoItemsSchema.pre('findOne', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
TDeviceInfoItemsSchema.statics.IsDeviceInfoItemsExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ visitorId: id, isDelete: false });
    });
};
const deviceinfoitems = (0, mongoose_1.model)('deviceinfoitems', TDeviceInfoItemsSchema);
exports.default = deviceinfoitems;
