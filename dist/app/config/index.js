"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    send_email: {
        nodemailer_email: process.env.NODEMAILER_EMAIL,
        nodemailer_password: process.env.NODEMAILER_PASSWORD,
    },
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    expires_in: process.env.EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
};
