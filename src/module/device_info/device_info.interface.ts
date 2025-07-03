import { Model } from 'mongoose';

export interface TDeviceInfo {
  visitorId: String;
  browser: String;
  device: String;
  os: String;
  version: String;
  isDelete: Boolean;
}

export interface DeviceInfoModal extends Model<TDeviceInfo> {
  // eslint-disable-next-line no-unused-vars
  IsDeviceInfoExist(id: string): Promise<TDeviceInfo>;
}

export interface DeviceInfoResponse {
  status: Boolean;
  message: string;
}
