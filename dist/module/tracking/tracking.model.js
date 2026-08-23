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
// 3. Schema definition
const TTimeZoneSchema = new mongoose_1.Schema({
    visitorId: {
        type: String,
        required: [true, 'visitorId is required'],
        trim: true,
        unique: true,
    },
    timezoneCoord: {
        type: [mongoose_1.Schema.Types.Mixed],
        required: [true, 'time xone coord is required'],
    },
    isDelete: {
        type: Boolean,
        required: [true, 'is Delete not required'],
    },
}, {
    timestamps: true,
});
//middlewere
TTimeZoneSchema.pre('find', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
TTimeZoneSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
    next();
});
TTimeZoneSchema.pre('findOne', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
// 4. Static method implementation
TTimeZoneSchema.statics.IsTimeZoneExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ visitorId: id });
    });
};
// 5. Model export
const timezones = (0, mongoose_1.model)('timezones', TTimeZoneSchema);
exports.default = timezones;
