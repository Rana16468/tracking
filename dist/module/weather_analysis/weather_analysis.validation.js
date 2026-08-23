"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const WeatherConditionSchema = zod_1.z.object({
    text: zod_1.z.string({ required_error: 'condition.text is required' }).trim(),
    icon: zod_1.z.string({ required_error: 'condition.icon is required' }).trim(),
    code: zod_1.z.number({ required_error: 'condition.code is required' }),
});
const WeatherLocationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'location.name is required' }).trim(),
    region: zod_1.z.string({ required_error: 'location.region is required' }).trim(),
    country: zod_1.z.string({ required_error: 'location.country is required' }).trim(),
    lat: zod_1.z.number({ required_error: 'location.lat is required' }),
    lon: zod_1.z.number({ required_error: 'location.lon is required' }),
    tz_id: zod_1.z.string({ required_error: 'location.tz_id is required' }).trim(),
    localtime_epoch: zod_1.z.number({ required_error: 'location.localtime_epoch is required' }),
    localtime: zod_1.z.string({ required_error: 'location.localtime is required' }).trim(),
});
const WeatherCurrentSchema = zod_1.z.object({
    last_updated_epoch: zod_1.z.number({ required_error: 'current.last_updated_epoch is required' }),
    last_updated: zod_1.z.string({ required_error: 'current.last_updated is required' }).trim(),
    temp_c: zod_1.z.number({ required_error: 'current.temp_c is required' }),
    temp_f: zod_1.z.number({ required_error: 'current.temp_f is required' }),
    is_day: zod_1.z.union([zod_1.z.literal(0), zod_1.z.literal(1)], { required_error: 'current.is_day is required' }),
    condition: WeatherConditionSchema,
    wind_mph: zod_1.z.number({ required_error: 'current.wind_mph is required' }),
    wind_kph: zod_1.z.number({ required_error: 'current.wind_kph is required' }),
    wind_degree: zod_1.z.number({ required_error: 'current.wind_degree is required' }),
    wind_dir: zod_1.z.string({ required_error: 'current.wind_dir is required' }).trim(),
    pressure_mb: zod_1.z.number({ required_error: 'current.pressure_mb is required' }),
    pressure_in: zod_1.z.number({ required_error: 'current.pressure_in is required' }),
    precip_mm: zod_1.z.number({ required_error: 'current.precip_mm is required' }),
    precip_in: zod_1.z.number({ required_error: 'current.precip_in is required' }),
    humidity: zod_1.z.number({ required_error: 'current.humidity is required' }),
    cloud: zod_1.z.number({ required_error: 'current.cloud is required' }),
    feelslike_c: zod_1.z.number({ required_error: 'current.feelslike_c is required' }),
    feelslike_f: zod_1.z.number({ required_error: 'current.feelslike_f is required' }),
    windchill_c: zod_1.z.number({ required_error: 'current.windchill_c is required' }),
    windchill_f: zod_1.z.number({ required_error: 'current.windchill_f is required' }),
    heatindex_c: zod_1.z.number({ required_error: 'current.heatindex_c is required' }),
    heatindex_f: zod_1.z.number({ required_error: 'current.heatindex_f is required' }),
    dewpoint_c: zod_1.z.number({ required_error: 'current.dewpoint_c is required' }),
    dewpoint_f: zod_1.z.number({ required_error: 'current.dewpoint_f is required' }),
    vis_km: zod_1.z.number({ required_error: 'current.vis_km is required' }),
    vis_miles: zod_1.z.number({ required_error: 'current.vis_miles is required' }),
    uv: zod_1.z.number({ required_error: 'current.uv is required' }),
    gust_mph: zod_1.z.number({ required_error: 'current.gust_mph is required' }),
    gust_kph: zod_1.z.number({ required_error: 'current.gust_kph is required' }),
});
const createWeatherSchema = zod_1.z.object({
    body: zod_1.z.object({
        visitorId: zod_1.z.string({ required_error: "visitor Id is required" }),
        location: WeatherLocationSchema,
        current: WeatherCurrentSchema,
    }),
});
// Update schema (all fields optional)
const updateWeatherSchema = zod_1.z.object({
    body: zod_1.z.object({
        visitorId: zod_1.z.string({ required_error: "visitor Id is required" }).optional(),
        location: WeatherLocationSchema.partial().optional(),
        current: WeatherCurrentSchema.partial().optional(),
    }),
});
const WeatherValidation = {
    create: createWeatherSchema,
    update: updateWeatherSchema,
};
exports.default = WeatherValidation;
