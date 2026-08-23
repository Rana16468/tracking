"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const country_controller_1 = __importDefault(require("./country.controller"));
const country_validation_1 = __importDefault(require("./country.validation"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = express_1.default.Router();
router.post('/create', (0, validationRequest_1.default)(country_validation_1.default.CountryZodSchema), country_controller_1.default.createCountry);
router.get('/find_all', country_controller_1.default.findAllCountries);
router.get('/find/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), country_controller_1.default.findCountryById);
router.put('/update/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validationRequest_1.default)(country_validation_1.default.CountryUpdateZodSchema), country_controller_1.default.updateCountry);
router.delete('/delete/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), country_controller_1.default.deleteCountry);
const CountryRoutes = router;
exports.default = CountryRoutes;
