import { RequestHandler } from 'express';
import catchAsync from '../../utility/catchAsync';
import AuthServices from './auth.services';
import sendRespone from '../../utility/sendRespone';
import httpStatus from 'http-status';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserIntoDb(req.body);
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully Login',
    data: result,
  });
});

const adminValidation: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.adminValidationIntoDb(
    req.user.id,
    req.params.id,
  );
  sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully Provided Admin Access',
    data: result,
  });
});
const find_by_all_users:RequestHandler=catchAsync(async(req , res)=>{


  const result=await AuthServices.find_by_all_users_IntoDb(req.query);
   sendRespone(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully Find By All Users',
    data: result,
  });

   
});

const AuthController = {
  loginUser,
  adminValidation,
  find_by_all_users
};

export default AuthController;
