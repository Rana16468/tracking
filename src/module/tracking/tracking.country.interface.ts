import { Model } from 'mongoose';

export interface TCountry {
  uuid: string;
  names: Record<string, unknown>;
  codes: Record<string, unknown>;
  capitals?: unknown[];
  flag?: Record<string, unknown>;
  region?: string;
  subregion?: string;
  area?: Record<string, unknown>;
  borders?: string[];
  calling_codes?: string[];
  cars?: Record<string, unknown>;
  classification?: Record<string, unknown>;
  continents?: string[];
  coordinates?: Record<string, unknown>;
  currencies?: unknown[];
  date?: Record<string, unknown>;
  demonyms?: Record<string, unknown>;
  economy?: Record<string, unknown>;
  government_type?: string;
  landlocked?: boolean;
  languages?: unknown[];
  links?: Record<string, unknown>;
  memberships?: Record<string, unknown>;
  number_format?: Record<string, unknown>;
  parent?: Record<string, unknown>;
  population?: number;
  postal_code?: Record<string, unknown>;
  timezones?: string[];
  tlds?: string[];
  units?: Record<string, unknown>;
  _meta?: Record<string, unknown>;
  isDelete?: boolean;
}

export interface CountryModal extends Model<TCountry> {
  isCountryExist(uuid: string): Promise<TCountry | null>;
}

export interface CountryResponse {
  status: boolean;
  message: string;
  data?: unknown;
}
