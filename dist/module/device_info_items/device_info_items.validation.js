"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Zod schema for creating a new DeviceInfoItems record
const createDeviceInfoItemsSchema = zod_1.z.object({
    body: zod_1.z.object({
        visitorId: zod_1.z
            .string({ required_error: 'visitorId is required' }),
        colorDepth: zod_1.z
            .number({ required_error: 'colorDepth is required' })
            .int()
            .nonnegative(),
        connectionType: zod_1.z
            .string({ required_error: 'connectionType is required' })
            .trim(),
        deviceMemory: zod_1.z
            .number({ required_error: 'deviceMemory is required' })
            .int()
            .nonnegative(),
        hardwareConcurrency: zod_1.z
            .number({ required_error: 'hardwareConcurrency is required' })
            .int()
            .nonnegative(),
        language: zod_1.z.string({ required_error: 'language is required' }).trim(),
        platform: zod_1.z.string({ required_error: 'platform is required' }).trim(),
        screenResolution: zod_1.z
            .string({ required_error: 'screenResolution is required' })
            .trim()
            .regex(/^\d+x\d+$/, {
            message: 'screenResolution must be in the format WIDTHxHEIGHT',
        }),
        timezone: zod_1.z.string({ required_error: 'timezone is required' }).trim(),
        touchSupport: zod_1.z.boolean({ required_error: 'touchSupport is required' }),
        userAgent: zod_1.z.string({ required_error: 'userAgent is required' }).trim(),
        isDelete: zod_1.z.boolean().optional().default(false),
    }),
});
// Zod schema for updating an existing DeviceInfoItems record (all fields optional)
const updateDeviceInfoItemsSchema = zod_1.z.object({
    body: zod_1.z.object({
        visitorId: zod_1.z
            .string()
            .optional(),
        colorDepth: zod_1.z.number().int().nonnegative().optional(),
        connectionType: zod_1.z.string().trim().optional(),
        deviceMemory: zod_1.z.number().int().nonnegative().optional(),
        hardwareConcurrency: zod_1.z.number().int().nonnegative().optional(),
        language: zod_1.z.string().trim().optional(),
        platform: zod_1.z.string().trim().optional(),
        screenResolution: zod_1.z
            .string()
            .trim()
            .regex(/^\d+x\d+$/, {
            message: 'screenResolution must be in the format WIDTHxHEIGHT',
        })
            .optional(),
        timezone: zod_1.z.string().trim().optional(),
        touchSupport: zod_1.z.boolean().optional(),
        userAgent: zod_1.z.string().trim().optional(),
        isDelete: zod_1.z.boolean().optional(),
    }),
});
// Export for use in route validation
const DeviceInfoItemsValidation = {
    create: createDeviceInfoItemsSchema,
    update: updateDeviceInfoItemsSchema,
};
exports.default = DeviceInfoItemsValidation;
