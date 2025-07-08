import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import AuthValidationSchema from './auth.validation';
import AuthController from './auth.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const route = express.Router();

route.post(
  '/login_user',
  validationRequest(AuthValidationSchema.AuthSchema),
  AuthController.loginUser,
);

route.get(
  '/admin_access/:id',
  auth(USER_ROLE.admin),
  AuthController.adminValidation,
);

route.get(
  '/find_by_all_users',
  auth(USER_ROLE.admin),
  AuthController.find_by_all_users,
);

const AuthRouter = route;

export default AuthRouter;
