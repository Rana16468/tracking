"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateCountrySchema = zod_1.z.object({
    body: zod_1.z.object({
        uuid: zod_1.z.string().min(1, 'uuid is required'),
        names: zod_1.z.any(),
        codes: zod_1.z.any(),
        region: zod_1.z.string().optional(),
        subregion: zod_1.z.string().optional(),
        population: zod_1.z.number().optional(),
        timezones: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
const UpdateCountrySchema = zod_1.z.object({
    body: zod_1.z.object({
        names: zod_1.z.any().optional(),
        codes: zod_1.z.any().optional(),
        region: zod_1.z.string().optional(),
        subregion: zod_1.z.string().optional(),
        population: zod_1.z.number().optional(),
        timezones: zod_1.z.array(zod_1.z.string()).optional(),
        isDelete: zod_1.z.boolean().optional(),
    }),
});
const CountryValidation = {
    CreateCountrySchema,
    UpdateCountrySchema,
};
exports.default = CountryValidation;
