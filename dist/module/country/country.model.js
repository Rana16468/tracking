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
const countrySchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: [true, 'uuid is required'],
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
    },
    officialName: {
        type: String,
        required: [true, 'officialName is required'],
        trim: true,
    },
    alpha2Code: {
        type: String,
        required: [true, 'alpha2Code is required'],
        unique: true,
        trim: true,
        uppercase: true,
    },
    alpha3Code: {
        type: String,
        required: [true, 'alpha3Code is required'],
        unique: true,
        trim: true,
        uppercase: true,
    },
    numericCode: {
        type: String,
        required: [true, 'numericCode is required'],
        unique: true,
        trim: true,
    },
    capital: {
        type: [String],
        default: [],
    },
    region: {
        type: String,
        required: [true, 'region is required'],
        trim: true,
    },
    subregion: {
        type: String,
        trim: true,
    },
    population: {
        type: Number,
        default: 0,
    },
    currencies: {
        type: [String],
        default: [],
    },
    languages: {
        type: [String],
        default: [],
    },
    timezones: {
        type: [String],
        default: [],
    },
    flagUrl: {
        type: String,
        trim: true,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
countrySchema.pre('find', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
countrySchema.pre('findOne', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
countrySchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
    next();
});
countrySchema.statics.isCountryExist = function (code) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({
            $or: [
                { alpha2Code: code.toUpperCase() },
                { alpha3Code: code.toUpperCase() },
                { numericCode: code },
                { uuid: code },
            ],
            isDelete: false,
        });
    });
};
const CountryModel = (0, mongoose_1.model)('Country', countrySchema);
exports.default = CountryModel;
