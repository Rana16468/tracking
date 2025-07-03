import { Schema, model } from 'mongoose';
import { IplocationModal, TIplocation } from './iplocation.interface';

const IplocationSchema = new Schema<TIplocation, IplocationModal>(
  {
    visitorId: {
      type: String,
      required: [true, 'visitorId is required'],
      trim: true,
      unique: true,
    },
    city: {
      type: String,
      required: [true, 'city is required'],
      trim: true,
    },
    region: {
      type: String,
      required: [true, 'region is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'country is required'],
      trim: true,
    },
    lat: {
      type: Number,
      required: [true, 'latitude is required'],
    },
    lon: {
      type: Number,
      required: [true, 'longitude is required'],
    },
    service: {
      type: String,
      required: [true, 'service is required'],
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

IplocationSchema.pre('find', function (next) {
  this.where({ isDelete: { $ne: true } });
  next();
});

IplocationSchema.pre('findOne', function (next) {
  this.where({ isDelete: { $ne: true } });
  next();
});

IplocationSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});

IplocationSchema.statics.IsIplocationExist = async function (
  id: string,
): Promise<TIplocation | null> {
  return this.findOne({ visitorId: id, isDelete: false }).exec();
};

const iplocations = model<TIplocation, IplocationModal>(
  'iplocations',
  IplocationSchema,
);

export default iplocations;
