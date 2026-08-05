import { z } from 'zod';

const CreateCountrySchema = z.object({
  body: z.object({
    uuid: z.string().min(1, 'uuid is required'),
    names: z.any(),
    codes: z.any(),
    region: z.string().optional(),
    subregion: z.string().optional(),
    population: z.number().optional(),
    timezones: z.array(z.string()).optional(),
  }),
});

const UpdateCountrySchema = z.object({
  body: z.object({
    names: z.any().optional(),
    codes: z.any().optional(),
    region: z.string().optional(),
    subregion: z.string().optional(),
    population: z.number().optional(),
    timezones: z.array(z.string()).optional(),
    isDelete: z.boolean().optional(),
  }),
});

const CountryValidation = {
  CreateCountrySchema,
  UpdateCountrySchema,
};

export default CountryValidation;
