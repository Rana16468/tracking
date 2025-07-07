import { RequestHandler } from 'express';
import catchAsync from '../../utility/catchAsync';
import UserServices from './user.services';
import sendRespone from '../../utility/sendRespone';
import httpStatus from 'http-status';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDb(req.body);
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully Change Onboarding Status',
    data: result,
  });
});

const chnagePassword: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.chnagePasswordIntoDb(req.body, req.user.id);
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully Change  Password',
    data: result,
  });
});

const delete_admin_user: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.delete_admin_userIntoDb(req.params.id);
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully Delete Admin',
    data: result,
  });
});

const delete_full_data_set: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.delete_full_data_set_IntoDb(
    req.params.visitorId,
  );
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully Full User  Details',
    data: result,
  });
});

const UserController = {
  createUser,
  chnagePassword,
  delete_admin_user,
  delete_full_data_set,
};

export default UserController;
