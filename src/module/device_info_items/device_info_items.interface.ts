import { Model } from 'mongoose';

export interface TDeviceInfoItems {
  visitorId: String;
  colorDepth: Number;
  connectionType: String;
  deviceMemory: Number;
  hardwareConcurrency: Number;
  language: String;
  platform: String;
  screenResolution: String;
  timezone: String;
  touchSupport: Boolean;
  userAgent: String;
  isDelete: Boolean;
}

export interface DeviceInfoModal extends Model<TDeviceInfoItems> {
  // eslint-disable-next-line no-unused-vars
  IsDeviceInfoItemsExist(id: string): Promise<TDeviceInfoItems>;
}

export interface DeviceInfoItemsResponse {
  status: Boolean;
  message: string;
}
