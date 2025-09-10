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

    ipLocation: {
      type: String,
      required: [true, 'ip location'],
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
