import { z } from 'zod';

export const DeviceInfoZodSchema = z.object({
  body: z.object({
    visitorId: z
      .string({
        required_error: 'visitorId is required',
      })
      .trim(),

    browser: z
      .string({
        required_error: 'browser is required',
      })
      .trim(),

    device: z
      .string({
        required_error: 'device is required',
      })
      .trim(),

    os: z
      .string({
        required_error: 'OS is required',
      })
      .trim(),

    version: z
      .string({
        required_error: 'version is required',
      })
      .trim(),

    isDelete: z.boolean().optional().default(false),
  }),
});

const DeviceInfoValidation = {
  DeviceInfoZodSchema,
};

export default DeviceInfoValidation;
