"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const PointPayloadSchema = joi_1.default.object({
    type: joi_1.default.string().required(),
});
exports.default = PointPayloadSchema;
