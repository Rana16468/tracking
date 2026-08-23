"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const globalErrorHandelar_1 = __importDefault(require("./middleware/globalErrorHandelar"));
const router_1 = __importDefault(require("./router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//middlewere
//credentials:true
//https://shoes-client.vercel.app
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send({ status: true, message: 'Traking Server Is Running' });
});
//username:navyboy
//password:5aNjnODj1ecD2sSx
app.use('/api/v1', router_1.default);
app.use(notFound_1.default);
app.use(globalErrorHandelar_1.default);
exports.default = app;
