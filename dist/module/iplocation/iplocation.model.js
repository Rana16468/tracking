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
const IplocationSchema = new mongoose_1.Schema({
    visitorId: {
        type: String,
        required: [true, 'visitorId is required'],
        trim: true,
        unique: true,
    },
    ipLocation: {
        type: String,
        required: [true, 'ip location'],
        trim: true,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
IplocationSchema.pre('find', function (next) {
    this.where({ isDelete: { $ne: true } });
    next();
});
IplocationSchema.pre('findOne', function (next) {
    this.where({ isDelete: { $ne: true } });
    next();
});
IplocationSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
    next();
});
IplocationSchema.statics.IsIplocationExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ visitorId: id, isDelete: false }).exec();
    });
};
const iplocations = (0, mongoose_1.model)('iplocations', IplocationSchema);
exports.default = iplocations;
