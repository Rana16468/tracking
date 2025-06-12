import { Schema, model } from 'mongoose';
import { TBrowserDetails, TimeZoneModal } from './browser_details.interface';


const TBrowserDetailsSchema = new Schema<TBrowserDetails, TimeZoneModal>(
  {
    timeZoneId: {
      type: Schema.Types.ObjectId,
      required: [true, 'timeZoneId is required'],
      ref: 'timezones',
    },
    language: {
      type: String,
      required: [true, 'language is required'],
    },
    languages: {
      type: String,
      required: [true, 'languages are required'],
    },
    platform: {
      type: String,
      required: [true, 'platform is required'],
    },
    timezone: {
      type: String,
      required: [true, 'timezone is required'],
    },
    utcOffset: {
      type: Number,
      required: [true, 'utcOffset is required'],
    },
    visitorId: {
      type: String,
      required: [true, 'visitorId is required'],
      trim: true,
      unique: true,
    },
    isDelete: {
      type: Boolean,
      required: [false, 'isDelete is not required'],
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

TBrowserDetailsSchema.pre('find', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});
TBrowserDetailsSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});
TBrowserDetailsSchema.pre('findOne', function (next) {
  this.find({ isDelete: { $ne: true } });

  next();
});

TBrowserDetailsSchema.statics.IsTBrowserDetailsExist = async function (
  id: string,
): Promise<TBrowserDetails | null> {
  return this.findOne({ visitorId: id });
};

// Export the model
const browserdetails = model<TBrowserDetails, TimeZoneModal>(
  'browserdetails',
  TBrowserDetailsSchema,
);

export default browserdetails;
