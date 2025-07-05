import httpStatus from 'http-status';
import dayjs from 'dayjs';
import { TContract } from './contract.interface';
import { Contract } from './contract.model';
import ApiError from '../../app/error/ApiError';
import QueryBuilder from '../../app/builder/QueryBuilder';

const createContractIntoDb = async (payload: TContract) => {
  const { deviceId } = payload;

  const startOfDay = dayjs().startOf('day').toDate();
  const endOfDay = dayjs().endOf('day').toDate();

  const alreadyPosted = await Contract.findOne({
    deviceId,
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });

  if (alreadyPosted) {
    return {
        status:false,
        message:'This device has already submitted a contract today.',
    }
  }

  const newContract = new Contract(payload);
  const result = await newContract.save();
  if (!result) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      'issues by the contract recorded section',
      '',
    );
  }
  return {
    status: true,
    message: 'successfully recorded',
  };
};

const AllContractIntoDb = async (query: Record<string, unknown>) => {
  try {
    const allContractQuery = new QueryBuilder(Contract.find({}), query)
      .search(['name', 'email', 'phoneNumber', 'address'])
      .filter()
      .sort()
      .paginate()
      .fields();

    const all_contract = await allContractQuery.modelQuery;
    const meta = await allContractQuery.countTotal();

    return { meta, all_contract };
  } catch (error: any) {
    throw new ApiError(
      error?.statusCode || httpStatus.SERVICE_UNAVAILABLE,
      error?.message || 'Failed to fetch all contracts',
      error,
    );
  }
};

const SpecificContractIdIntoDb = async (id: string) => {
  const result = await Contract.findById(id);
  return result;
};

const UpdateContractFromDb = async (
  id: string,
  payload: Partial<TContract>,
) => {
  const isExistUser = await Contract.findById(id);
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Exist in System', '');
  }
  const result = await Contract.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const DeleteContractFromDb = async (id: string) => {
  const isExistUser = await Contract.findById(id);
  if (!isExistUser) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User Not Exist in the System',
      '',
    );
  }

  const result = await Contract.updateOne({ _id: id }, { isDelete: true });
  return result;
};

const FavoriteContrcatFromDb = async (id: string) => {
  const isExistUser = await Contract.findById(id);
  if (!isExistUser) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User Not Exist in the System',
      '',
    );
  }
  const result = await Contract.updateOne(
    { _id: id },
    { isfavorite: isExistUser?.isfavorite ? false : true },
  );
  return result;
};

export const ContractService = {
  createContractIntoDb,
  AllContractIntoDb,
  SpecificContractIdIntoDb,
  UpdateContractFromDb,
  DeleteContractFromDb,
  FavoriteContrcatFromDb,
};
