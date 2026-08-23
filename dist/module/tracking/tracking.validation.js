"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const TTimeZoneSchemaZ = zod_1.z.object({
    body: zod_1.z.object({
        visitorId: zod_1.z.string().min(1, 'visitorId is required'),
        timezoneCoord: zod_1.z.array(zod_1.z.any()).nonempty('timezoneCoord is required'),
    }),
});
const TimeZoneValidation = {
    TTimeZoneSchemaZ,
};
exports.default = TimeZoneValidation;
