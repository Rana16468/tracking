import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import UserValidationSchema from './user.validation';
import UserController from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create_user',
  validationRequest(UserValidationSchema.createUserZodSchema),
  UserController.createUser,
);

router.patch(
  '/chnage_password',
  auth(USER_ROLE.admin),
  validationRequest(UserValidationSchema.ChnagePasswordSchema),
  UserController.chnagePassword,
);

router.delete(
  '/delete_admin_user/:id',
  auth(USER_ROLE.admin),
  UserController.delete_admin_user,
);

router.delete(
  '/delete_full_data_set/:visitorId',
  auth(USER_ROLE.admin),
  UserController.delete_full_data_set,
);

const UserRouters = router;
export default UserRouters;
