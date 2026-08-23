"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/uploadFile.ts
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const http_status_1 = __importDefault(require("http-status"));
const fs_1 = __importDefault(require("fs"));
const ApiError_1 = __importDefault(require("../app/error/ApiError"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        let folderPath = './src/public';
        if (file.mimetype.startsWith('image')) {
            folderPath = './src/public/images';
        }
        else if (file.mimetype === 'application/pdf') {
            folderPath = './src/public/pdf';
        }
        else {
            cb(new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Only images and PDFs are allowed', ''), './src/public');
            return;
        }
        // Check if the folder exists, if not, create it
        if (!fs_1.default.existsSync(folderPath)) {
            fs_1.default.mkdirSync(folderPath, { recursive: true });
        }
        cb(null, folderPath);
    },
    filename(_req, file, cb) {
        const fileExt = path_1.default.extname(file.originalname);
        const fileName = `${file.originalname
            .replace(fileExt, '')
            .toLocaleLowerCase()
            .split(' ')
            .join('-')}-${(0, uuid_1.v4)()}`;
        cb(null, fileName + fileExt);
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
