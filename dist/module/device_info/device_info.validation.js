"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceInfoZodSchema = void 0;
const zod_1 = require("zod");
exports.DeviceInfoZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        visitorId: zod_1.z
            .string({
            required_error: 'visitorId is required',
        })
            .trim(),
        browser: zod_1.z
            .string({
            required_error: 'browser is required',
        })
            .trim(),
        device: zod_1.z
            .string({
            required_error: 'device is required',
        })
            .trim(),
        os: zod_1.z
            .string({
            required_error: 'OS is required',
        })
            .trim(),
        version: zod_1.z
            .string({
            required_error: 'version is required',
        })
            .trim(),
        isDelete: zod_1.z.boolean().optional().default(false),
    }),
});
const DeviceInfoValidation = {
    DeviceInfoZodSchema: exports.DeviceInfoZodSchema,
};
exports.default = DeviceInfoValidation;
