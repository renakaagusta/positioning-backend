"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAuthenticationPayloadSchema = exports.PutAuthenticationPayloadSchema = exports.PostAuthenticationPayloadSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.PostAuthenticationPayloadSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.PutAuthenticationPayloadSchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required(),
});
exports.DeleteAuthenticationPayloadSchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required(),
});