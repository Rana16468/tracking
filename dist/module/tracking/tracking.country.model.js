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
const CountrySchema = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: [true, 'uuid is required'],
        unique: true,
        trim: true,
    },
    names: { type: mongoose_1.Schema.Types.Mixed, required: [true, 'names is required'] },
    codes: { type: mongoose_1.Schema.Types.Mixed, required: [true, 'codes is required'] },
    capitals: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
    flag: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    region: { type: String, trim: true },
    subregion: { type: String, trim: true },
    area: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    borders: { type: [String], default: [] },
    calling_codes: { type: [String], default: [] },
    cars: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    classification: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    continents: { type: [String], default: [] },
    coordinates: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    currencies: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
    date: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    demonyms: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    economy: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    government_type: { type: String, trim: true },
    landlocked: { type: Boolean, default: false },
    languages: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
    links: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    memberships: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    number_format: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    parent: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    population: { type: Number },
    postal_code: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    timezones: { type: [String], default: [] },
    tlds: { type: [String], default: [] },
    units: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    _meta: { type: mongoose_1.Schema.Types.Mixed, default: {} },
    isDelete: { type: Boolean, default: false },
}, {
    timestamps: true,
});
CountrySchema.pre('find', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
CountrySchema.pre('findOne', function (next) {
    this.find({ isDelete: { $ne: true } });
    next();
});
CountrySchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
    next();
});
CountrySchema.statics.isCountryExist = function (uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ uuid, isDelete: false });
    });
};
const countries = (0, mongoose_1.model)('countries', CountrySchema);
exports.default = countries;
