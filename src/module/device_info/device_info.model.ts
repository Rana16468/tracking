import { Schema, model } from 'mongoose';
import { DeviceInfoModal, TDeviceInfo } from './device_info.interface';

const TDeviceInfoSchema = new Schema<TDeviceInfo, DeviceInfoModal>(
  {
    visitorId: {
      type: String,
      required: [true, 'visitorId is required'],
      trim: true,
      unique:true
    },
    browser: {
      type: String,
      required: [true, 'browser is required'],
    },
    device: {
      type: String,
      required: [true, 'device is required'],
    },
    os: {
      type: String,
      required: [true, 'OS is required'],
    },
    version: {
      type: String,
      required: [true, 'version is required'],
    },
    isDelete: {
      type: Boolean,
      required: [false, 'isDelete is required'],
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

TDeviceInfoSchema.pre('find', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});
TDeviceInfoSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});
TDeviceInfoSchema.pre('findOne', function (next) {
  this.find({ isDelete: { $ne: true } });

  next();
});

TDeviceInfoSchema.statics.IsDeviceInfoExist = async function (
  id: string,
): Promise<TDeviceInfo | null> {
  return this.findOne({ visitorId: id, isDelete: false });
};

const deviceInfos = model<TDeviceInfo, DeviceInfoModal>(
  'deviceInfos',
  TDeviceInfoSchema,
);
export default deviceInfos;
