import { Schema, model } from 'mongoose';
import {
  TWeatherResponse,
  TWeatherLocation,
  TWeatherCurrent,
  TWeatherCondition,
  IpWeatherModal,
} from './weather_analysis.interface';

const WeatherConditionSchema = new Schema<TWeatherCondition>(
  {
    text: { type: String, required: true, trim: true },
    icon: { type: String, required: true, trim: true },
    code: { type: Number, required: true },
  },
  { _id: false },
);

const WeatherLocationSchema = new Schema<TWeatherLocation>(
  {
    name: { type: String, required: true, trim: true },
    region: { type: String, required: false, trim: true },
    country: { type: String, required: true, trim: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    tz_id: { type: String, required: true, trim: true },
    localtime_epoch: { type: Number, required: true },
    localtime: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const WeatherCurrentSchema = new Schema<TWeatherCurrent>(
  {
    last_updated_epoch: { type: Number, required: true },
    last_updated: { type: String, required: true, trim: true },
    temp_c: { type: Number, required: true },
    temp_f: { type: Number, required: true },
    is_day: { type: Number, required: true, enum: [0, 1] },
    condition: { type: WeatherConditionSchema, required: true },
    wind_mph: { type: Number, required: true },
    wind_kph: { type: Number, required: true },
    wind_degree: { type: Number, required: true },
    wind_dir: { type: String, required: true, trim: true },
    pressure_mb: { type: Number, required: true },
    pressure_in: { type: Number, required: true },
    precip_mm: { type: Number, required: true },
    precip_in: { type: Number, required: true },
    humidity: { type: Number, required: true },
    cloud: { type: Number, required: true },
    feelslike_c: { type: Number, required: true },
    feelslike_f: { type: Number, required: true },
    windchill_c: { type: Number, required: true },
    windchill_f: { type: Number, required: true },
    heatindex_c: { type: Number, required: true },
    heatindex_f: { type: Number, required: true },
    dewpoint_c: { type: Number, required: true },
    dewpoint_f: { type: Number, required: true },
    vis_km: { type: Number, required: true },
    vis_miles: { type: Number, required: true },
    uv: { type: Number, required: true },
    gust_mph: { type: Number, required: true },
    gust_kph: { type: Number, required: true },
  },
  { _id: false },
);

const WeatherResponseSchema = new Schema<TWeatherResponse, IpWeatherModal>(
  {
    visitorId: { type: String, required: true, unique: true, trim: true },
    location: { type: WeatherLocationSchema, required: true },
    current: { type: WeatherCurrentSchema, required: true },
    isDelete:{type:Boolean, required:false}
  },
  { timestamps: true },
);

WeatherResponseSchema.pre('find', function (next) {
  this.where({ isDelete: { $ne: true } });
  next();
});

WeatherResponseSchema.pre('findOne', function (next) {
  this.where({ isDelete: { $ne: true } });
  next();
});

WeatherResponseSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});

WeatherResponseSchema.statics.IsIpWeatherModalExist = async function (
  id: string,
): Promise<TWeatherResponse | null> {
  return this.findOne({ visitorId: id }).exec();
};

const ipweathers = model<TWeatherResponse, IpWeatherModal>(
  'ipweathers',
  WeatherResponseSchema,
);

export default ipweathers;
