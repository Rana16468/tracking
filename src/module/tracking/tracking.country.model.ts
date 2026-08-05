import { Schema, model } from 'mongoose';
import { TCountry, CountryModal } from './tracking.country.interface';

const CountrySchema = new Schema<TCountry, CountryModal>(
  {
    uuid: {
      type: String,
      required: [true, 'uuid is required'],
      unique: true,
      trim: true,
    },
    names: { type: Schema.Types.Mixed, required: [true, 'names is required'] },
    codes: { type: Schema.Types.Mixed, required: [true, 'codes is required'] },
    capitals: { type: [Schema.Types.Mixed], default: [] },
    flag: { type: Schema.Types.Mixed, default: {} },
    region: { type: String, trim: true },
    subregion: { type: String, trim: true },
    area: { type: Schema.Types.Mixed, default: {} },
    borders: { type: [String], default: [] },
    calling_codes: { type: [String], default: [] },
    cars: { type: Schema.Types.Mixed, default: {} },
    classification: { type: Schema.Types.Mixed, default: {} },
    continents: { type: [String], default: [] },
    coordinates: { type: Schema.Types.Mixed, default: {} },
    currencies: { type: [Schema.Types.Mixed], default: [] },
    date: { type: Schema.Types.Mixed, default: {} },
    demonyms: { type: Schema.Types.Mixed, default: {} },
    economy: { type: Schema.Types.Mixed, default: {} },
    government_type: { type: String, trim: true },
    landlocked: { type: Boolean, default: false },
    languages: { type: [Schema.Types.Mixed], default: [] },
    links: { type: Schema.Types.Mixed, default: {} },
    memberships: { type: Schema.Types.Mixed, default: {} },
    number_format: { type: Schema.Types.Mixed, default: {} },
    parent: { type: Schema.Types.Mixed, default: {} },
    population: { type: Number },
    postal_code: { type: Schema.Types.Mixed, default: {} },
    timezones: { type: [String], default: [] },
    tlds: { type: [String], default: [] },
    units: { type: Schema.Types.Mixed, default: {} },
    _meta: { type: Schema.Types.Mixed, default: {} },
    isDelete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

CountrySchema.pre('find', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});

CountrySchema.pre('findOne', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});

CountrySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});

CountrySchema.statics.isCountryExist = async function (uuid: string) {
  return this.findOne({ uuid, isDelete: false });
};

const countries = model<TCountry, CountryModal>('countries', CountrySchema);

export default countries;
