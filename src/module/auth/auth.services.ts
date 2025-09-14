import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import { TAuth } from './auth.interface';
import mongoose from 'mongoose';
import users from '../user/user.model';
import { USER_ACCESSIBILITY, USER_ROLE } from '../user/user.constant';
import { jwtHelpers } from '../../app/helper/jwtHelpers';
import config from '../../app/config';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { TUser } from '../user/user.interface';

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
    ) as any;

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


const find_by_all_users_IntoDb=async(query: Record<string, unknown>)=>{

  try{

     const allusersQuery = new QueryBuilder(
          users.find({ isDelete: false }),
          query,
        )
          .search(['name','email','phoneNumber'])
          .filter()
          .sort()
          .paginate()
          .fields();
        const allusers = await allusersQuery.modelQuery;
        const meta = await allusersQuery.countTotal();
    
        return { meta, allusers };

  }
  catch (err: any) {
    if (err instanceof ApiError) throw err;

    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error in find_by_all_users_IntoDb',
      err.message,
    );
  }


};




const socialMediaLoginIntoDb = async (payload: Partial<TUser>) => {
  let session: mongoose.ClientSession | null = null;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const isUserExist = await users.findOne(
      {
        email: payload.email,
        isDelete: false,
        status: USER_ACCESSIBILITY.isProgress,
      },
      { _id: 1, role: 1, email: 1, isVerify: 1 },
      { session },
    );

    let jwtPayload;

    if (!isUserExist) {
      // New user from social login
      payload.isVerify = true; // auto-verified for social accounts
      const newUser = new users(payload);
      const savedUser = await newUser.save({ session });

      jwtPayload = {
        id: savedUser._id.toString(),
        role: savedUser.role,
        email: savedUser.email,
      };
    } else if (isUserExist.isVerify) {
      // Existing verified user
      jwtPayload = {
        id: isUserExist._id.toString(),
        role: isUserExist.role,
        email: isUserExist.email,
      };
    } else {
      // User exists but not verified → block login
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'User exists but is not verified. Please verify your account.', ''
      );
    }

    // Generate tokens
    const accessToken = jwtHelpers.generateToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.expires_in as string,
    );

    const refreshToken = jwtHelpers.generateToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.refresh_expires_in as string,
    );

    await session.commitTransaction();
    return { accessToken, refreshToken };
  } catch (error) {
    if (session) await session.abortTransaction();
    throw error;
  } finally {
    if (session) session.endSession();
  }
};

    





const AuthServices = {
  loginUserIntoDb,
  adminValidationIntoDb,
  find_by_all_users_IntoDb,
  socialMediaLoginIntoDb
};

export default AuthServices;
