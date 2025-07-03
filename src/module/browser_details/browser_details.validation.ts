import { z } from 'zod';

const BrowserDetailsZodSchema = z.object({
  body: z.object({
    language: z.string({ required_error: 'language is required' }),
    languages: z.string({ required_error: 'languages are required' }),
    platform: z.string({ required_error: 'platform is required' }),
    timezone: z.string({ required_error: 'timezone is required' }),
    utcOffset: z.number({ required_error: 'utcOffset is required' }),
    visitorId: z
      .string({ required_error: 'visitorId is required' })
      .trim()
      .min(1, 'visitorId cannot be empty'),
  }),
});

const BrowserDetailsValidation = {
  BrowserDetailsZodSchema,
};
export default BrowserDetailsValidation;
