import { z } from 'zod';

// Zod schema for creating a new DeviceInfoItems record
const createDeviceInfoItemsSchema = z.object({
  body: z.object({
    visitorId: z
      .string({ required_error: 'visitorId is required' }),
      
    colorDepth: z
      .number({ required_error: 'colorDepth is required' })
      .int()
      .nonnegative(),
    connectionType: z
      .string({ required_error: 'connectionType is required' })
      .trim(),
    deviceMemory: z
      .number({ required_error: 'deviceMemory is required' })
      .int()
      .nonnegative(),
    hardwareConcurrency: z
      .number({ required_error: 'hardwareConcurrency is required' })
      .int()
      .nonnegative(),
    language: z.string({ required_error: 'language is required' }).trim(),
    platform: z.string({ required_error: 'platform is required' }).trim(),
    screenResolution: z
      .string({ required_error: 'screenResolution is required' })
      .trim()
      .regex(/^\d+x\d+$/, {
        message: 'screenResolution must be in the format WIDTHxHEIGHT',
      }),
    timezone: z.string({ required_error: 'timezone is required' }).trim(),
    touchSupport: z.boolean({ required_error: 'touchSupport is required' }),
    userAgent: z.string({ required_error: 'userAgent is required' }).trim(),
    isDelete: z.boolean().optional().default(false),
  }),
});

// Zod schema for updating an existing DeviceInfoItems record (all fields optional)
const updateDeviceInfoItemsSchema = z.object({
  body: z.object({
    visitorId: z
      .string()
      .optional(),
    colorDepth: z.number().int().nonnegative().optional(),
    connectionType: z.string().trim().optional(),
    deviceMemory: z.number().int().nonnegative().optional(),
    hardwareConcurrency: z.number().int().nonnegative().optional(),
    language: z.string().trim().optional(),
    platform: z.string().trim().optional(),
    screenResolution: z
      .string()
      .trim()
      .regex(/^\d+x\d+$/, {
        message: 'screenResolution must be in the format WIDTHxHEIGHT',
      })
      .optional(),
    timezone: z.string().trim().optional(),
    touchSupport: z.boolean().optional(),
    userAgent: z.string().trim().optional(),
    isDelete: z.boolean().optional(),
  }),
});

// Export for use in route validation
const DeviceInfoItemsValidation = {
  create: createDeviceInfoItemsSchema,
  update: updateDeviceInfoItemsSchema,
};

export default DeviceInfoItemsValidation;
