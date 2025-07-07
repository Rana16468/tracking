import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import { TAuth } from './auth.interface';
import mongoose from 'mongoose';
import users from '../user/user.model';
import { USER_ACCESSIBILITY, USER_ROLE } from '../user/user.constant';
import { jwtHelpers } from '../../app/helper/jwtHelpers';
import config from '../../app/config';

const loginUserIntoDb = async (payload: TAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isUserExist = await users.findOne(
      {
        $and: [
          { email: payload.email },
          { isVerify: true },
          { status: USER_ACCESSIBILITY.isProgress },
          { isDelete: false },
        ],
      },
      { password: 1, _id: 1, isVerify: 1, email: 1, role: 1 },
      { session },
    );

    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found', '');
    }

    if (
      !(await users.isPasswordMatched(
        payload?.password as string,
        isUserExist.password,
      ))
    ) {
      throw new ApiError(httpStatus.FORBIDDEN, 'This Password Not Matched', '');
    }

    const jwtPayload = {
      id: isUserExist.id,
      role: isUserExist.role,
      email: isUserExist.email,
    };

    let accessToken: string | null = null;

    if (isUserExist.isVerify) {
      accessToken = jwtHelpers.generateToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.expires_in as string,
      );
    }
    await session.commitTransaction();

    return {
      accessToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const adminValidationIntoDb = async (userId: string, id: string) => {
  try {
    if (!userId) {
      throw new ApiError(httpStatus.NOT_FOUND, 'not founded admin', '');
    }

    const result = await users?.findOneAndUpdate(
      { _id: id, isDelete: false },
      { isVerify: true, role: USER_ROLE.admin },
      { new: true, upsert: true },
    );
    if (!result) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        ' issues by the admin  access  section ',
        '',
      );
    }

    return { status: true, message: '' };
  } catch (err: any) {
    if (err instanceof ApiError) throw err;

    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in admin validation service',
      err.message,
    );
  }
};




const AuthServices = {
  loginUserIntoDb,
  adminValidationIntoDb,
};

export default AuthServices;
