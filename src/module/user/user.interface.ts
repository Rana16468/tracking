import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';



export interface UserResponse {
  status: boolean;
  message: string;
}

export type TUser = {
  id: string;
  role: 'user' | 'admin' | 'superAdmin';
  name: string;
  password?: string;
  email: string;
  phoneNumber?: string;
  verificationCode?: number;
  isVerify: boolean;
  status: 'isProgress' | 'Blocked';
  picture?: string;
  ipaddress?:string;
  browsername?:string;
  device?:string;
  deviceId?:string;
  provider: {
  type: String,
  enum: ['googleauth', 'facebookauth', 'githubauth', 'emailpassword'], 
  default: 'googleauth',
  required: false,
},

  engine?:string;
  os?:string;
  platform?:string;
  stripeAccountId?: string;
  isStripeConnected?: boolean;
  fcm?:string;
  address?:string;
  isDelete: boolean;
};

export interface UserModel extends Model<TUser> {

  isUserExistByCustomId(id: string): Promise<TUser>;

  isPasswordMatched(
    userSendingPassword: string,
    existingPassword: string,
  ): Promise<boolean>;
  isJWTIssuesBeforePasswordChange(
    passwordChangeTimestamp: Date,
    jwtIssuesTime: number,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
