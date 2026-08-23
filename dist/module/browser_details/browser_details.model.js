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
const TBrowserDetailsSchema = new mongoose_1.Schema({
    timeZoneId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'timeZoneId is required'],
        ref: 'timezones',
    },
    language: {
        type: String,
        required: [true, 'language is required'],
    },
    languages: {
        type: String,
        required: [true, 'languages are required'],
    },
    platform: {
        type: String,
        required: [true, 'platform is required'],
    },
    timezone: {
        type: String,
        required: [true, 'timezone is required'],
    },
    utcOffset: {
        type: Number,
        required: [true, 'utcOffset is required'],
    },
    visitorId: {
        type: String,
        required: [true, 'visitorId is required'],
        trim: true,
        unique: true,
    },
    isDelete: {
        type: Boolean,
        required: [false, 'isDelete is not required'],
        default: false,
    },
}, {
    timestamps: true,
});
TBrowserDetailsSchema.pre('find', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
TBrowserDetailsSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
    next();
});
TBrowserDetailsSchema.pre('findOne', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
TBrowserDetailsSchema.statics.IsTBrowserDetailsExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ visitorId: id });
    });
};
// Export the model
const browserdetails = (0, mongoose_1.model)('browserdetails', TBrowserDetailsSchema);
exports.default = browserdetails;
