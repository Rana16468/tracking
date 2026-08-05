import { z } from 'zod';

export const CountryZodSchema = z.object({
  body: z.object({
    uuid: z.string({ required_error: 'uuid is required' }).trim(),
    name: z.string({ required_error: 'name is required' }).trim(),
    officialName: z
      .string({ required_error: 'officialName is required' })
      .trim(),
    alpha2Code: z
      .string({ required_error: 'alpha2Code is required' })
      .trim()
      .length(2, 'alpha2Code must be 2 characters'),
    alpha3Code: z
      .string({ required_error: 'alpha3Code is required' })
      .trim()
      .length(3, 'alpha3Code must be 3 characters'),
    numericCode: z
      .string({ required_error: 'numericCode is required' })
      .trim(),
    capital: z.array(z.string().trim()).optional().default([]),
    region: z.string({ required_error: 'region is required' }).trim(),
    subregion: z.string().trim().optional(),
    population: z.number().optional().default(0),
    currencies: z.array(z.string().trim()).optional().default([]),
    languages: z.array(z.string().trim()).optional().default([]),
    timezones: z.array(z.string().trim()).optional().default([]),
    flagUrl: z.string().trim().url().optional(),
    isDelete: z.boolean().optional().default(false),
  }),
});

export const CountryUpdateZodSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    officialName: z.string().trim().optional(),
    alpha2Code: z.string().trim().length(2).optional(),
    alpha3Code: z.string().trim().length(3).optional(),
    numericCode: z.string().trim().optional(),
    capital: z.array(z.string().trim()).optional(),
    region: z.string().trim().optional(),
    subregion: z.string().trim().optional(),
    population: z.number().optional(),
    currencies: z.array(z.string().trim()).optional(),
    languages: z.array(z.string().trim()).optional(),
    timezones: z.array(z.string().trim()).optional(),
    flagUrl: z.string().trim().url().optional(),
    isDelete: z.boolean().optional(),
  }),
});

const CountryValidation = {
  CountryZodSchema,
  CountryUpdateZodSchema,
};

export default CountryValidation;
