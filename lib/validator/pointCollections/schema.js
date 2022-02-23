"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const geometry = joi_1.default.object({
    coordinates: joi_1.default.array().items(joi_1.default.number()).required(),
    type: joi_1.default.string()
});
const property = joi_1.default.object({
    text: joi_1.default.string().required()
});
const point = joi_1.default.object({
    geometry: geometry,
    properties: property,
    type: joi_1.default.string()
});
const PointCollectionPayloadSchema = joi_1.default.object({
    type: joi_1.default.string().required(),
    data: joi_1.default.array().items(point)
});
exports.default = PointCollectionPayloadSchema;
