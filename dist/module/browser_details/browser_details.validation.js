"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const BrowserDetailsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        language: zod_1.z.string({ required_error: 'language is required' }),
        languages: zod_1.z.string({ required_error: 'languages are required' }),
        platform: zod_1.z.string({ required_error: 'platform is required' }),
        timezone: zod_1.z.string({ required_error: 'timezone is required' }),
        utcOffset: zod_1.z.number({ required_error: 'utcOffset is required' }),
        visitorId: zod_1.z
            .string({ required_error: 'visitorId is required' })
            .trim()
            .min(1, 'visitorId cannot be empty'),
    }),
});
const BrowserDetailsValidation = {
    BrowserDetailsZodSchema,
};
exports.default = BrowserDetailsValidation;
