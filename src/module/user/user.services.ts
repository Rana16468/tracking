import httpStatus from 'http-status';
import ApiError from '../../app/error/ApiError';
import users from './user.model';
import { USER_ACCESSIBILITY } from './user.constant';
import { TUser } from './user.interface';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../app/config';
import timezones from '../tracking/tracking.model';
import ipweathers from '../weather_analysis/weather_analysis.model';
import iplocations from '../iplocation/iplocation.model';
import deviceInfos from '../device_info/device_info.model';
import deviceinfoitems from '../device_info_items/device_info_items.model';
import browserdetails from '../browser_details/browser_details.model';
const generateUniqueOTP = async (): Promise<number> => {
  const MAX_ATTEMPTS = 10;

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const otp = Math.floor(10000 + Math.random() * 90000);

    const existingUser = await users.findOne({ verificationCode: otp });

    if (!existingUser) {
      return otp;
    }
  }

  throw new ApiError(
    httpStatus.NOT_EXTENDED,
    'Failed to generate a unique OTP after multiple attempts',
    '',
  );
};

const createUserIntoDb = async (payload: TUser) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const otp = await generateUniqueOTP();

    const isExistUser = await users.findOne(
      {
        $and: [
          {
            email: payload.email,
            isDelete: false,
            isVerify: true,
            status: USER_ACCESSIBILITY.isProgress,
          },
        ],
      },
      { _id: 1, email: 1, phoneNumber: 1, role: 1 },
    );

    payload.verificationCode = otp;
    payload.phoneNumber = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    if (isExistUser) {
      throw new ApiError(
        httpStatus.FOUND,
        'this email alredy exist in our database',
        '',
      );
    }

    const authBuilder = new users(payload);

    const result = await authBuilder.save({ session });
    // await sendEmail(
    //   payload.email,
    //   emailcontext.sendvarificationData(
    //     payload.email,
    //     otp,
    //     'User Verification Email',
    //   ),
    //   'Verification OTP Code',
    // );

    await session.commitTransaction();
    session.endSession();

    return result && { status: true, message: 'checked your email box' };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    throw new ApiError(
      httpStatus.SERVICE_UNAVAILABLE,
      'server unavailable',
      error,
    );
  }
};

const chnagePasswordIntoDb = async (
  payload: {
    newpassword: string;
    oldpassword: string;
  },
  id: string,
) => {
  try {
    const isUserExist = await users.findOne(
      {
        $and: [
          { _id: id },
          { isVerify: true },
          { status: USER_ACCESSIBILITY.isProgress },
          { isDelete: false },
        ],
      },
      { password: 1 },
    ) as any;;

    if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found', '');
    }

    if (
      !(await users.isPasswordMatched(
        payload.oldpassword,
        isUserExist?.password,
      ))
    ) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'Old password does not match',
        '',
      );
    }

    const newHashedPassword = await bcrypt.hash(
      payload.newpassword,
      Number(config.bcrypt_salt_rounds),
    );

    const updatedUser = await users.findByIdAndUpdate(
      id,
      { password: newHashedPassword },
      { new: true, upsert: true },
    );
    if (!updatedUser) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'password  change database error',
        '',
      );
    }

    return {
      success: true,
      message: 'Password updated successfully',
    };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.SERVICE_UNAVAILABLE,
      'Password change failed',
      error,
    );
  }
};

const delete_admin_userIntoDb = async (id: string) => {
  try {
    const result = await users.findByIdAndDelete(id);
    if (!result) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'issues by the admin delete section error',
        '',
      );
    }
    return { status: true, message: 'successfully delete' };
  } catch (error: any) {
    throw new ApiError(
      httpStatus.SERVICE_UNAVAILABLE,
      'delete_admin_userIntoDb failed',
      error,
    );
  }
};

const delete_full_data_set_IntoDb = async (visitorId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Promise.all([
      timezones.deleteOne({ visitorId }).session(session),
      ipweathers.deleteOne({ visitorId }).session(session),
      iplocations.deleteOne({ visitorId }).session(session),
      deviceInfos.deleteOne({ visitorId }).session(session),
      deviceinfoitems.deleteOne({ visitorId }).session(session),
      browserdetails.deleteOne({ visitorId }).session(session),
    ]);

    await session.commitTransaction();
    session.endSession();

    return {
      status: true,
      message: 'All visitor data deleted successfully',
    };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    throw new ApiError(
      httpStatus.SERVICE_UNAVAILABLE,
      'Failed to delete full data set',
      error.message || error,
    );
  }
};

const UserServices = {
  createUserIntoDb,
  chnagePasswordIntoDb,
  delete_admin_userIntoDb,
  delete_full_data_set_IntoDb,
};
export default UserServices;
