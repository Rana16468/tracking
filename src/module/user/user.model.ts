import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../app/config';
import { USER_ACCESSIBILITY, USER_ROLE } from './user.constant';
import { TUser, UserModel } from './user.interface';

const TUserSchema = new Schema<TUser, UserModel>(
  {
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.user,
      required: [true, 'Role is required'],
    },
    name: { type: String, required: [true, 'Name is required'] },
    password: { type: String, required: [false, 'Password is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [false, 'phone number is  not required'],
      unique: true,
    },
    verificationCode: {
      type: Number,
      required: [false, ' verification Code is not required'],
      unique: true,
    },
    isVerify: {
      type: Boolean,
      required: [false, 'is verify not required'],
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(USER_ACCESSIBILITY),
      default: USER_ACCESSIBILITY.isProgress,
      required: [true ,'statis is  required'],
    },
    picture: {
      type: String,
      required:[false, 'picture is not required'],
      default: null,
    },
    ipaddress: { type: String, required: [false, 'ipaddress is not required'] },
    browsername: { type: String, required: [false, 'browser name is not required'] },
    device: { type: String, required: [false, 'browser name is not required'] },
    deviceId: { type: String, unique: true, required: [false, 'deviceId required'] },
      provider: {
      type: String,
      enum: ['googleauth', 'facebookauth', 'githubauth', 'emailpassword'],
      default: 'googleauth',
    },
    engine: { type: String, required: false },
    os: { type: String, required: false },
    platform: { type: String, required: false },
    
    address: { type: String, required: false },
    isDelete: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Remove password from JSON
TUserSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

// Hash password before save
TUserSchema.pre('save', async function (next) {
  const user = this as any;
  if (user.isModified('password') && user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// Clear password after save
TUserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Exclude soft-deleted docs
TUserSchema.pre('find', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});

TUserSchema.pre('findOne', function (next) {
  this.findOne({ isDelete: { $ne: true } });
  next();
});

TUserSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });
  next();
});

// Static methods
TUserSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await users.findOne({ id });
};

TUserSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashPassword: string,
) {
  return bcrypt.compare(plainTextPassword, hashPassword);
};

TUserSchema.statics.isJWTIssuesBeforePasswordChange = async function (
  passwordChangeTimestamp: Date,
  jwtIssuesTime: number,
) {
  const passwordChangeTime = new Date(passwordChangeTimestamp).getTime() / 1000;
  return passwordChangeTime > jwtIssuesTime;
};

const users = model<TUser, UserModel>('users', TUserSchema);

export default users;
