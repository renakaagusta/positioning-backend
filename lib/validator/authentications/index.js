"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
const InvariantError_1 = __importDefault(require("../../exceptions/InvariantError"));
;
const AuthenticationsValidator = {
    validatePostAuthenticationPayload: (payload) => {
        const validationResult = schema_1.PostAuthenticationPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError_1.default(validationResult.error.message);
        }
    },
    validatePutAuthenticationPayload: (payload) => {
        const validationResult = schema_1.PutAuthenticationPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError_1.default(validationResult.error.message);
        }
    },
    validateDeleteAuthenticationPayload: (payload) => {
        const validationResult = schema_1.DeleteAuthenticationPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError_1.default(validationResult.error.message);
        }
    },
};
exports.default = AuthenticationsValidator;
