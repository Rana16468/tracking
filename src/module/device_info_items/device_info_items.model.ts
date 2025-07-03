import { Schema, model } from 'mongoose';
import { TDeviceInfoItems } from './device_info_items.interface';
import { DeviceInfoModal } from '../device_info/device_info.interface';

const TDeviceInfoItemsSchema = new Schema<TDeviceInfoItems, DeviceInfoModal>(
  {
    visitorId: {
      type: String,
      required: [true, 'visitorId is required'],
      trim: true,
      unique: true,
    },
    colorDepth: {
      type: Number,
      required: [true, 'colorDepth is required'],
    },
    connectionType: {
      type: String,
      required: [true, 'connectionType is required'],
      trim: true,
    },
    deviceMemory: {
      type: Number,
      required: [true, 'deviceMemory is required'],
    },
    hardwareConcurrency: {
      type: Number,
      required: [true, 'hardwareConcurrency is required'],
    },
    language: {
      type: String,
      required: [true, 'language is required'],
      trim: true,
    },
    platform: {
      type: String,
      required: [true, 'platform is required'],
      trim: true,
    },
    screenResolution: {
      type: String,
      required: [true, 'screenResolution is required'],
      trim: true,
    },
    timezone: {
      type: String,
      required: [true, 'timezone is required'],
      trim: true,
    },
    touchSupport: {
      type: Boolean,
      required: [true, 'touchSupport is required'],
    },
    userAgent: {
      type: String,
      required: [true, 'userAgent is required'],
      trim: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

TDeviceInfoItemsSchema.pre('find', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});
TDeviceInfoItemsSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});
TDeviceInfoItemsSchema.pre('findOne', function (next) {
  this.find({ isDelete: { $ne: true } });

  next();
});

TDeviceInfoItemsSchema.statics.IsDeviceInfoItemsExist = async function (
  id: string,
): Promise<TDeviceInfoItems | null> {
  return this.findOne({ visitorId: id, isDelete: false });
};

const deviceinfoitems = model<TDeviceInfoItems, DeviceInfoModal>(
  'deviceinfoitems',
  TDeviceInfoItemsSchema,
);

export default deviceinfoitems;
