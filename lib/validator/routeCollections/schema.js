"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const route = joi_1.default.object({
    from: joi_1.default.string().required(),
    to: joi_1.default.array().items(joi_1.default.string()).required()
});
const RouteCollectionPayloadSchema = joi_1.default.object({
    type: joi_1.default.string().required(),
    data: joi_1.default.array().items(route)
});
exports.default = RouteCollectionPayloadSchema;
