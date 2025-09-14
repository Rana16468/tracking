import { z } from 'zod';
import { USER_ACCESSIBILITY, USER_ROLE } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    role: z.enum(Object.values(USER_ROLE) as [string, ...string[]]).default(
      USER_ROLE.user,
    ),
    name: z.string({ required_error: 'Name is required' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters')
      .optional(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    phoneNumber: z
      .string()
      .regex(
        /^(\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,10}$/,
        'Invalid phone number format',
      )
      .optional(),
    verificationCode: z.number().optional(),
    isVerify: z.boolean().default(false),
    status: z
      .enum(Object.values(USER_ACCESSIBILITY) as [string, ...string[]])
      .default(USER_ACCESSIBILITY.isProgress),
    picture: z.string().url().nullable().optional(),
    ipaddress: z.string().optional(),
    browsername: z.string().optional(),
    device: z.string().optional(),
    deviceId: z.string().optional(),
    engine: z.string().optional(),
    os: z.string().optional(),
    platform: z.string().optional(),
    stripeAccountId: z.string().optional(),
    isStripeConnected: z.boolean().default(false),
    fcm: z.string().nullable().optional(),
    address: z.string().optional(),
    isDelete: z.boolean().default(false),
  }),
});

const UserVerification = z.object({
  body: z.object({
    verificationCode: z
      .number({ required_error: 'varification code is required' })
      .min(6, { message: 'min 6 character accepted' }),
  }),
});

const ChnagePasswordSchema = z.object({
  body: z.object({
    newpassword: z
      .string({ required_error: 'new password is required' })
      .min(6, { message: 'min 6 character accepted' }),
    oldpassword: z
      .string({ required_error: 'old password is  required' })
      .min(6, { message: 'min 6 character accepted' }),
  }),
});

const UpdateUserProfileSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'user name is required' })
      .min(3, { message: 'min 3 character accepted' })
      .max(15, { message: 'max 15 character accepted' })
      .optional(),
    picture: z.string({ required_error: 'optional photot' }).url().optional(),
     phoneNumber: z
      .string()
      .regex(
        /^(\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,10}$/,
        'Invalid phone number format',
      )
      .optional(),
  }),
});

const ForgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is Required' })
      .email('Invalid email format')
      .refine(
        (email) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        {
          message: 'Invalid email format',
        },
      ),
  }),
});

const verificationCodeSchema = z.object({
  body: z.object({
    verificationCode: z
      .number({ required_error: ' verificationCode is require' })
      .min(4, { message: 'min 4  number accepted' }),
  }),
});

const resetPasswordSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'userId is require' }),
    password: z.string({ required_error: 'password is require' }),
  }),
});

const UserValidationSchema = {
  createUserZodSchema,
  UserVerification,
  ChnagePasswordSchema,
  UpdateUserProfileSchema,
  ForgotPasswordSchema,
  verificationCodeSchema,
  resetPasswordSchema,
};

export default UserValidationSchema;
