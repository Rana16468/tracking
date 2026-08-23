"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Zod schema for creating a new IP location record
const createIplocationSchema = zod_1.z.object({
    body: zod_1.z.object({
        visitorId: zod_1.z.string({ required_error: 'visitorId is required' }),
        city: zod_1.z.string({ required_error: 'city is required' }).trim(),
        region: zod_1.z.string({ required_error: 'region is required' }).trim(),
        country: zod_1.z.string({ required_error: 'country is required' }).trim(),
        lat: zod_1.z
            .number({ required_error: 'lat is required' })
            .min(-90, { message: 'lat must be ≥ -90' })
            .max(90, { message: 'lat must be ≤ 90' }),
        lon: zod_1.z
            .number({ required_error: 'lon is required' })
            .min(-180, { message: 'lon must be ≥ -180' })
            .max(180, { message: 'lon must be ≤ 180' }),
        service: zod_1.z.string({ required_error: 'service is required' }).trim(),
        isDelete: zod_1.z.boolean().optional().default(false),
    }),
});
const updateIplocationSchema = zod_1.z.object({
    body: zod_1.z.object({
        visitorId: zod_1.z
            .string()
            .optional(),
        city: zod_1.z.string().trim().optional(),
        region: zod_1.z.string().trim().optional(),
        country: zod_1.z.string().trim().optional(),
        lat: zod_1.z
            .number()
            .min(-90, { message: 'lat must be ≥ -90' })
            .max(90, { message: 'lat must be ≤ 90' })
            .optional(),
        lon: zod_1.z
            .number()
            .min(-180, { message: 'lon must be ≥ -180' })
            .max(180, { message: 'lon must be ≤ 180' })
            .optional(),
        service: zod_1.z.string().trim().optional(),
        isDelete: zod_1.z.boolean().optional(),
    }),
});
const ipLocationSchema = zod_1.z.object({
    body: zod_1.z.object({
        visitorId: zod_1.z.string({ required_error: 'visitorId is required' }),
        ipLocation: zod_1.z.string({ required_error: 'ip location is required' }),
    }),
});
const IplocationValidation = {
    create: createIplocationSchema,
    update: updateIplocationSchema,
    ipLocation: ipLocationSchema,
};
exports.default = IplocationValidation;
