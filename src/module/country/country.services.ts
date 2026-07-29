import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import CountryModel from './country.model';
import { CountryResponse, TCountry } from './country.interface';
import QueryBuilder from '../../app/builder/QueryBuilder';
import NodeCache from "node-cache";
const createCountryIntoDb = async (payload: TCountry): Promise<CountryResponse> => {
  try {
    const result = await CountryModel.findOneAndUpdate(
      { uuid: payload.uuid, isDelete: false },
      { $set: payload },
      { new: true, upsert: true },
    );

    if (!result) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        'Failed to create or update country.',
        '',
      );
    }

    return { status: true, message: 'Country saved successfully' };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error occurred while saving country.',
      error?.message || error,
    );
  }
};



export const cache = new NodeCache({
  stdTTL: 300, // 5 minutes
  checkperiod: 320,
});

const findAllCountriesIntoDb = async (query: Record<string, unknown>) => {
  try {
    const cacheKey = `countries:${JSON.stringify(query)}`;

    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const countriesQuery = new QueryBuilder(
      CountryModel.find({}),
      query
    )
      .search([
  "name",
  "alpha2Code",
  "alpha3Code",
  "subregion",
  "region",
  "demonym",
  "nativeName",
  "numericCode",
])
      .filter()
      .sort()
      .paginate()
      .fields();

    const countries = await countriesQuery.modelQuery;
    const meta = await countriesQuery.countTotal();

    const response = { meta, countries };

    // Store in cache for 5 minutes
    cache.set(cacheKey, response);

    return response;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error fetching countries.",
      error?.message || error
    );
  }
};

const findCountryByIdIntoDb = async (id: string) => {
  try {
    const country = await CountryModel.findById(id);
    if (!country) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Country not found.', '');
    }
    return country;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error fetching country by id.',
      error?.message || error,
    );
  }
};

const updateCountryIntoDb = async (id: string, payload: Partial<TCountry>) => {
  try {
    const country = await CountryModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!country) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Country not found.', '');
    }
    return { status: true, message: 'Country updated successfully' };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error updating country.',
      error?.message || error,
    );
  }
};

const deleteCountryIntoDb = async (id: string) => {
  try {
    const country = await CountryModel.findByIdAndUpdate(id, { isDelete: true }, { new: true });
    if (!country) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Country not found.', '');
    }
    return { status: true, message: 'Country deleted successfully' };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error deleting country.',
      error?.message || error,
    );
  }
};

const CountryServices = {
  createCountryIntoDb,
  findAllCountriesIntoDb,
  findCountryByIdIntoDb,
  updateCountryIntoDb,
  deleteCountryIntoDb,
};

export default CountryServices;
