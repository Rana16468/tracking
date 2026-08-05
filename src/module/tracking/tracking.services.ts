import httpStatus from 'http-status';
import https from 'https';
import NodeCache from 'node-cache';
import ApiError from '../../app/error/ApiError';
import timezones from './tracking.model';
import countries from './tracking.country.model';
import { TimeZoneResponse, TTimeZone } from './tracking.interface';
import { TCountry, CountryResponse } from './tracking.country.interface';
import QueryBuilder from '../../app/builder/QueryBuilder';

const timeZoneCache = new NodeCache({ stdTTL: 60 * 60 });
const createTimeZoneIntoDb = async (
  payload: TTimeZone,
): Promise<TimeZoneResponse> => {
  try {
    const cacheKey = `timezone:${payload.visitorId}`;

    const cachedResult = timeZoneCache.get<TimeZoneResponse>(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    const timeZone = await timezones.findOneAndUpdate(
      { visitorId: payload.visitorId, isDelete: false },
      { $set: payload },
      { new: true, upsert: true },
    );

    if (!timeZone) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        'Failed to create or update timezone record.',
        '',
      );
    }

    const response: TimeZoneResponse = {
      status: true,
      message: 'Timezone successfully recorded',
    };

    timeZoneCache.set(cacheKey, response);

    return response;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error occurred while recording timezone.',
      error?.message || error,
    );
  }
};

const findByAllTimeZoneIntoDb = async (query: Record<string, unknown>) => {
  try {
    const specificUserResaleHistoryQuery = new QueryBuilder(
      timezones.find({ isDelete: false }),

      query,
    )
      .search(['visitorId','_id'])
      .filter()
      .sort()
      .paginate()
      .fields();
    const all_resale_history = await specificUserResaleHistoryQuery.modelQuery;
    const meta = await specificUserResaleHistoryQuery.countTotal();

    return { meta, all_resale_history };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error find By All TimeZone',
      error?.message || error,
    );
  }
};

const delete_timezones_IntoDb = async (id: string) => {
  try {
    const result = await timezones.findByIdAndDelete(id);
    if (!result) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        'issues by the delete section',
        '',
      );
    }
    return { status: true, message: 'successfully  delete' };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error delete_timezones_IntoDb',
      error?.message || error,
    );
  }
};

const find_by_specific_timezones_IntoDb = async (id: string) => {
  try {
    return await timezones.findById(id);
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error find_by_specific_timezones_IntoDb',
      error?.message || error,
    );
  }
};

const createCountryIntoDb = async (payload: TCountry): Promise<CountryResponse> => {
  try {
    const result = await countries.findOneAndUpdate(
      { uuid: payload.uuid, isDelete: false },
      { $set: { ...payload, isDelete: false } },
      { new: true, upsert: true },
    );

    if (!result) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        'Failed to create or update country record.',
        '',
      );
    }

    return { status: true, message: 'Country successfully recorded' };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error occurred while recording country.',
      error?.message || error,
    );
  }
};

const findByAllCountryIntoDb = async (query: Record<string, unknown>) => {
  try {
    const countryQuery = new QueryBuilder(countries.find({ isDelete: false }), query)
      .search(['uuid', 'region', 'subregion'])
      .filter()
      .sort()
      .paginate()
      .fields();

    const all_countries = await countryQuery.modelQuery;
    const meta = await countryQuery.countTotal();

    return { meta, all_countries };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error find By All Country',
      error?.message || error,
    );
  }
};

const find_by_specific_country_IntoDb = async (id: string) => {
  try {
    const result = await countries.findById(id).select('-updatedAt -createdAt');
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'not founded', '');
    }
    return result;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error find_by_specific_country_IntoDb',
      error?.message || error,
    );
  }
};

const update_country_IntoDb = async (id: string, payload: Partial<TCountry>) => {
  try {
    const result = await countries.findByIdAndUpdate(id, { $set: payload }, { new: true });
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'not founded', '');
    }
    return result;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error update_country_IntoDb',
      error?.message || error,
    );
  }
};

const delete_country_IntoDb = async (id: string) => {
  try {
    const result = await countries.findByIdAndDelete(id);
    if (!result) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        'issues by the delete section',
        '',
      );
    }
    return { status: true, message: 'successfully delete' };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error delete_country_IntoDb',
      error?.message || error,
    );
  }
};

const allCountryCreateIntoDB = async () => {
  const API_KEY = 'rc_live_35bec5ef8fbb4bb89040b08008184ac7';
  const BASE_URL = 'https://api.restcountries.com/countries/v5';

  try {
    const offsets = [0, 100, 200];
    const requests = offsets.map((offset) =>
      fetch(`${BASE_URL}?limit=100&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Country API returned status ${res.status}`);
        }
        return res.json();
      }),
    );

    const responses = await Promise.all(requests);
    const countriesData = responses.flatMap((item) => {
      if (Array.isArray(item)) {
        return item;
      }
      if (item && Array.isArray((item as any).data)) {
        return (item as any).data;
      }
      return [];
    });

    return countriesData;
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error fetching country data',
      error?.message || error,
    );
  }
};

const importAllCountriesIntoDb = async () => {
  try {
    const countriesData = await allCountryCreateIntoDB();
    if (!Array.isArray(countriesData) || countriesData.length === 0) {
      return { status: true, message: 'No countries available to import', data: [] };
    }

    const operations = countriesData
      .filter((country: any) => country?.uuid)
      .map((country: any) => ({
        updateOne: {
          filter: { uuid: country.uuid, isDelete: false },
          update: { $set: { ...country, isDelete: false } },
          upsert: true,
        },
      }));

    if (operations.length === 0) {
      return { status: true, message: 'No valid country records to import', data: [] };
    }

    const result = await countries.bulkWrite(operations);

    return {
      status: true,
      message: 'Countries imported successfully',
      data: {
        insertedCount: result.upsertedCount,
        modifiedCount: result.modifiedCount,
      },
    };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error importing country data',
      error?.message || error,
    );
  }
};

const TimeZoneServices = {
  createTimeZoneIntoDb,
  findByAllTimeZoneIntoDb,
  delete_timezones_IntoDb,
  find_by_specific_timezones_IntoDb,
  createCountryIntoDb,
  findByAllCountryIntoDb,
  find_by_specific_country_IntoDb,
  update_country_IntoDb,
  delete_country_IntoDb,
  allCountryCreateIntoDB,
  importAllCountriesIntoDb,
};

export default TimeZoneServices;
