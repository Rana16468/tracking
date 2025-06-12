import { z } from 'zod';

const TTimeZoneSchemaZ = z.object({
  body: z.object({
    visitorId: z.string().min(1, 'visitorId is required'),
    timezoneCoord: z.array(z.any()).nonempty('timezoneCoord is required'),
  }),
});

const TimeZoneValidation = {
  TTimeZoneSchemaZ,
};

export default TimeZoneValidation;
