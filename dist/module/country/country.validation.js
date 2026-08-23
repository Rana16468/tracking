"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryUpdateZodSchema = exports.CountryZodSchema = void 0;
const zod_1 = require("zod");
exports.CountryZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        uuid: zod_1.z.string({ required_error: 'uuid is required' }).trim(),
        name: zod_1.z.string({ required_error: 'name is required' }).trim(),
        officialName: zod_1.z
            .string({ required_error: 'officialName is required' })
            .trim(),
        alpha2Code: zod_1.z
            .string({ required_error: 'alpha2Code is required' })
            .trim()
            .length(2, 'alpha2Code must be 2 characters'),
        alpha3Code: zod_1.z
            .string({ required_error: 'alpha3Code is required' })
            .trim()
            .length(3, 'alpha3Code must be 3 characters'),
        numericCode: zod_1.z
            .string({ required_error: 'numericCode is required' })
            .trim(),
        capital: zod_1.z.array(zod_1.z.string().trim()).optional().default([]),
        region: zod_1.z.string({ required_error: 'region is required' }).trim(),
        subregion: zod_1.z.string().trim().optional(),
        population: zod_1.z.number().optional().default(0),
        currencies: zod_1.z.array(zod_1.z.string().trim()).optional().default([]),
        languages: zod_1.z.array(zod_1.z.string().trim()).optional().default([]),
        timezones: zod_1.z.array(zod_1.z.string().trim()).optional().default([]),
        flagUrl: zod_1.z.string().trim().url().optional(),
        isDelete: zod_1.z.boolean().optional().default(false),
    }),
});
exports.CountryUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().optional(),
        officialName: zod_1.z.string().trim().optional(),
        alpha2Code: zod_1.z.string().trim().length(2).optional(),
        alpha3Code: zod_1.z.string().trim().length(3).optional(),
        numericCode: zod_1.z.string().trim().optional(),
        capital: zod_1.z.array(zod_1.z.string().trim()).optional(),
        region: zod_1.z.string().trim().optional(),
        subregion: zod_1.z.string().trim().optional(),
        population: zod_1.z.number().optional(),
        currencies: zod_1.z.array(zod_1.z.string().trim()).optional(),
        languages: zod_1.z.array(zod_1.z.string().trim()).optional(),
        timezones: zod_1.z.array(zod_1.z.string().trim()).optional(),
        flagUrl: zod_1.z.string().trim().url().optional(),
        isDelete: zod_1.z.boolean().optional(),
    }),
});
const CountryValidation = {
    CountryZodSchema: exports.CountryZodSchema,
    CountryUpdateZodSchema: exports.CountryUpdateZodSchema,
};
exports.default = CountryValidation;
