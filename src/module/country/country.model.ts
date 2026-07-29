import { Schema, model } from 'mongoose';
import { CountryModal, TCountry } from './country.interface';

const countrySchema = new Schema<TCountry, CountryModal>(
  {
    uuid: {
      type: String,
      required: [true, 'uuid is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
    },
    officialName: {
      type: String,
      required: [true, 'officialName is required'],
      trim: true,
    },
    alpha2Code: {
      type: String,
      required: [true, 'alpha2Code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    alpha3Code: {
      type: String,
      required: [true, 'alpha3Code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    numericCode: {
      type: String,
      required: [true, 'numericCode is required'],
      unique: true,
      trim: true,
    },
    capital: {
      type: [String],
      default: [],
    },
    region: {
      type: String,
      required: [true, 'region is required'],
      trim: true,
    },
    subregion: {
      type: String,
      trim: true,
    },
    population: {
      type: Number,
      default: 0,
    },
    currencies: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      default: [],
    },
    timezones: {
      type: [String],
      default: [],
    },
    flagUrl: {
      type: String,
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

countrySchema.pre('find', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});

countrySchema.pre('findOne', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});

countrySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});

countrySchema.statics.isCountryExist = async function (
  code: string,
): Promise<TCountry | null> {
  return this.findOne({
    $or: [
      { alpha2Code: code.toUpperCase() },
      { alpha3Code: code.toUpperCase() },
      { numericCode: code },
      { uuid: code },
    ],
    isDelete: false,
  });
};

const CountryModel = model<TCountry, CountryModal>('Country', countrySchema);
export default CountryModel;
