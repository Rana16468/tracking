import { Model, Types } from 'mongoose';

export interface TBrowserDetails {
  timeZoneId: Types.ObjectId;
  language: String;
  languages: String;
  platform: String;
  timezone: String;
  utcOffset: Number;
  visitorId: String;
  isDelete:Boolean;
}

export interface TimeZoneModal extends Model<TBrowserDetails> {
  // eslint-disable-next-line no-unused-vars
  IsTBrowserDetailsExist(id: string): Promise<TBrowserDetails>;
}

export interface BrowserDetailsResponse {
  status: Boolean;
  message: string;
}
