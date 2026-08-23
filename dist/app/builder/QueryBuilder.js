"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query = {}) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            const stringFields = searchableFields.filter((field) => {
                const schemaPath = this.modelQuery.model.schema.path(field);
                return schemaPath && schemaPath.instance === 'String';
            });
            this.modelQuery = this.modelQuery.find({
                $or: stringFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        var _a, _b, _c;
        let queryObject = Object.assign({}, this.query);
        if (this.query.maxPrice && this.query.minPrice) {
            queryObject = {
                price: {
                    $gte: Number(this.query.minPrice),
                    $lte: Number(this.query.maxPrice),
                },
            };
        }
        if ((_a = this.query) === null || _a === void 0 ? void 0 : _a.releaseDate) {
            queryObject = {
                releaseDate: {
                    $gte: (_b = this.query) === null || _b === void 0 ? void 0 : _b.releaseDate,
                    $lte: (_c = this.query) === null || _c === void 0 ? void 0 : _c.releaseDate,
                },
            };
        }
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((el) => delete queryObject[el]);
        this.modelQuery = this.modelQuery.find(queryObject);
        return this;
    }
    sort() {
        var _a, _b;
        const sortBy = ((_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(',').join(' ')) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sortBy);
        return this;
    }
    paginate() {
        var _a, _b, _c, _d;
        const limit = Math.max(Number((_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.limit) !== null && _b !== void 0 ? _b : 10), 1);
        const page = Math.max(Number((_d = (_c = this.query) === null || _c === void 0 ? void 0 : _c.page) !== null && _d !== void 0 ? _d : 1), 1);
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b;
        const fields = ((_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',').join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const totalQueries = this.modelQuery.getFilter();
            const total = yield this.modelQuery.model.countDocuments(totalQueries);
            const page = Math.max(Number((_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.page) !== null && _b !== void 0 ? _b : 1), 1);
            const limit = Math.max(Number((_d = (_c = this.query) === null || _c === void 0 ? void 0 : _c.limit) !== null && _d !== void 0 ? _d : 10), 1);
            const totalPage = Math.ceil(total / limit);
            return {
                page,
                limit,
                total,
                totalPage,
            };
        });
    }
}
exports.default = QueryBuilder;
