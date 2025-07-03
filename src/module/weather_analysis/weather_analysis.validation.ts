import { z } from 'zod';

const WeatherConditionSchema = z.object({
  text: z.string({ required_error: 'condition.text is required' }).trim(),
  icon: z.string({ required_error: 'condition.icon is required' }).trim(),
  code: z.number({ required_error: 'condition.code is required' }),
});

const WeatherLocationSchema = z.object({
  name: z.string({ required_error: 'location.name is required' }).trim(),
  region: z.string({ required_error: 'location.region is required' }).trim(),
  country: z.string({ required_error: 'location.country is required' }).trim(),
  lat: z.number({ required_error: 'location.lat is required' }),
  lon: z.number({ required_error: 'location.lon is required' }),
  tz_id: z.string({ required_error: 'location.tz_id is required' }).trim(),
  localtime_epoch: z.number({ required_error: 'location.localtime_epoch is required' }),
  localtime: z.string({ required_error: 'location.localtime is required' }).trim(),
});

const WeatherCurrentSchema = z.object({
  last_updated_epoch: z.number({ required_error: 'current.last_updated_epoch is required' }),
  last_updated: z.string({ required_error: 'current.last_updated is required' }).trim(),
  temp_c: z.number({ required_error: 'current.temp_c is required' }),
  temp_f: z.number({ required_error: 'current.temp_f is required' }),
  is_day: z.union([z.literal(0), z.literal(1)], { required_error: 'current.is_day is required' }),
  condition: WeatherConditionSchema,
  wind_mph: z.number({ required_error: 'current.wind_mph is required' }),
  wind_kph: z.number({ required_error: 'current.wind_kph is required' }),
  wind_degree: z.number({ required_error: 'current.wind_degree is required' }),
  wind_dir: z.string({ required_error: 'current.wind_dir is required' }).trim(),
  pressure_mb: z.number({ required_error: 'current.pressure_mb is required' }),
  pressure_in: z.number({ required_error: 'current.pressure_in is required' }),
  precip_mm: z.number({ required_error: 'current.precip_mm is required' }),
  precip_in: z.number({ required_error: 'current.precip_in is required' }),
  humidity: z.number({ required_error: 'current.humidity is required' }),
  cloud: z.number({ required_error: 'current.cloud is required' }),
  feelslike_c: z.number({ required_error: 'current.feelslike_c is required' }),
  feelslike_f: z.number({ required_error: 'current.feelslike_f is required' }),
  windchill_c: z.number({ required_error: 'current.windchill_c is required' }),
  windchill_f: z.number({ required_error: 'current.windchill_f is required' }),
  heatindex_c: z.number({ required_error: 'current.heatindex_c is required' }),
  heatindex_f: z.number({ required_error: 'current.heatindex_f is required' }),
  dewpoint_c: z.number({ required_error: 'current.dewpoint_c is required' }),
  dewpoint_f: z.number({ required_error: 'current.dewpoint_f is required' }),
  vis_km: z.number({ required_error: 'current.vis_km is required' }),
  vis_miles: z.number({ required_error: 'current.vis_miles is required' }),
  uv: z.number({ required_error: 'current.uv is required' }),
  gust_mph: z.number({ required_error: 'current.gust_mph is required' }),
  gust_kph: z.number({ required_error: 'current.gust_kph is required' }),
});


const createWeatherSchema = z.object({
  body: z.object({
    visitorId: z.string({required_error:"visitor Id is required"}),
    location: WeatherLocationSchema,
    current: WeatherCurrentSchema,
  }),
});

// Update schema (all fields optional)
const updateWeatherSchema = z.object({
  body: z.object({
    visitorId: z.string({required_error:"visitor Id is required"}).optional(),
    location: WeatherLocationSchema.partial().optional(),
    current: WeatherCurrentSchema.partial().optional(),
  }),
});

const WeatherValidation = {
  create: createWeatherSchema,
  update: updateWeatherSchema,
};

export default  WeatherValidation;
