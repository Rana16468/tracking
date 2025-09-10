import { z } from 'zod';
import mongoose from 'mongoose';

// Zod schema for creating a new IP location record
const createIplocationSchema = z.object({
  body: z.object({
    visitorId: z.string({ required_error: 'visitorId is required' }),
    city: z.string({ required_error: 'city is required' }).trim(),
    region: z.string({ required_error: 'region is required' }).trim(),
    country: z.string({ required_error: 'country is required' }).trim(),
    lat: z
      .number({ required_error: 'lat is required' })
      .min(-90, { message: 'lat must be ≥ -90' })
      .max(90, { message: 'lat must be ≤ 90' }),
    lon: z
      .number({ required_error: 'lon is required' })
      .min(-180, { message: 'lon must be ≥ -180' })
      .max(180, { message: 'lon must be ≤ 180' }),
    service: z.string({ required_error: 'service is required' }).trim(),
    isDelete: z.boolean().optional().default(false),
  }),
});

const updateIplocationSchema = z.object({
  body: z.object({
    visitorId: z
      .string()

      .optional(),
    city: z.string().trim().optional(),
    region: z.string().trim().optional(),
    country: z.string().trim().optional(),
    lat: z
      .number()
      .min(-90, { message: 'lat must be ≥ -90' })
      .max(90, { message: 'lat must be ≤ 90' })
      .optional(),
    lon: z
      .number()
      .min(-180, { message: 'lon must be ≥ -180' })
      .max(180, { message: 'lon must be ≤ 180' })
      .optional(),
    service: z.string().trim().optional(),
    isDelete: z.boolean().optional(),
  }),
});

const ipLocationSchema = z.object({
  body: z.object({
    visitorId: z.string({ required_error: 'visitorId is required' }),
    ipLocation: z.string({ required_error: 'ip location is required' }),
  }),
});

const IplocationValidation = {
  create: createIplocationSchema,
  update: updateIplocationSchema,
  ipLocation: ipLocationSchema,
};

export default IplocationValidation;
