import { Model } from 'mongoose';

export interface TWeatherResponse {
  visitorId: String;
  location: TWeatherLocation;
  current: TWeatherCurrent;
  isDelete:Boolean
}

export interface TWeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface TWeatherCurrent {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: 0 | 1;
  condition: TWeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface TWeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface IpWeatherModal extends Model<TWeatherResponse> {
  // eslint-disable-next-line no-unused-vars
  IsIpWeatherModalExist(id: string): Promise<TWeatherResponse>;
}

export interface WeatherResponse {
  status: Boolean;
  message: string;
}
