import { Model } from 'mongoose';

export interface TCountry {
  uuid: string;
  name: string;
  officialName: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
  capital: string[];
  region: string;
  subregion?: string;
  population?: number;
  currencies?: string[];
  languages?: string[];
  timezones?: string[];
  flagUrl?: string;
  isDelete?: boolean;
}

export interface CountryModal extends Model<TCountry> {
  isCountryExist(code: string): Promise<TCountry | null>;
}

export interface CountryResponse {
  status: boolean;
  message: string;
}
