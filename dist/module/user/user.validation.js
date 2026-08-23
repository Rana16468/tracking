"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum(Object.values(user_constant_1.USER_ROLE)).default(user_constant_1.USER_ROLE.user),
        name: zod_1.z.string({ required_error: 'Name is required' }),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must be at least 6 characters')
            .optional(),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email('Invalid email format'),
        phoneNumber: zod_1.z
            .string()
            .regex(/^(\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,10}$/, 'Invalid phone number format')
            .optional(),
        verificationCode: zod_1.z.number().optional(),
        isVerify: zod_1.z.boolean().default(false),
        status: zod_1.z
            .enum(Object.values(user_constant_1.USER_ACCESSIBILITY))
            .default(user_constant_1.USER_ACCESSIBILITY.isProgress),
        picture: zod_1.z.string().url().nullable().optional(),
        ipaddress: zod_1.z.string().optional(),
        browsername: zod_1.z.string().optional(),
        device: zod_1.z.string().optional(),
        deviceId: zod_1.z.string().optional(),
        engine: zod_1.z.string().optional(),
        os: zod_1.z.string().optional(),
        platform: zod_1.z.string().optional(),
        stripeAccountId: zod_1.z.string().optional(),
        isStripeConnected: zod_1.z.boolean().default(false),
        fcm: zod_1.z.string().nullable().optional(),
        address: zod_1.z.string().optional(),
        isDelete: zod_1.z.boolean().default(false),
    }),
});
const UserVerification = zod_1.z.object({
    body: zod_1.z.object({
        verificationCode: zod_1.z
            .number({ required_error: 'varification code is required' })
            .min(6, { message: 'min 6 character accepted' }),
    }),
});
const ChnagePasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        newpassword: zod_1.z
            .string({ required_error: 'new password is required' })
            .min(6, { message: 'min 6 character accepted' }),
        oldpassword: zod_1.z
            .string({ required_error: 'old password is  required' })
            .min(6, { message: 'min 6 character accepted' }),
    }),
});
const UpdateUserProfileSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'user name is required' })
            .min(3, { message: 'min 3 character accepted' })
            .max(15, { message: 'max 15 character accepted' })
            .optional(),
        picture: zod_1.z.string({ required_error: 'optional photot' }).url().optional(),
        phoneNumber: zod_1.z
            .string()
            .regex(/^(\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,10}$/, 'Invalid phone number format')
            .optional(),
    }),
});
const ForgotPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is Required' })
            .email('Invalid email format')
            .refine((email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }, {
            message: 'Invalid email format',
        }),
    }),
});
const verificationCodeSchema = zod_1.z.object({
    body: zod_1.z.object({
        verificationCode: zod_1.z
            .number({ required_error: ' verificationCode is require' })
            .min(4, { message: 'min 4  number accepted' }),
    }),
});
const resetPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'userId is require' }),
        password: zod_1.z.string({ required_error: 'password is require' }),
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
exports.default = UserValidationSchema;
