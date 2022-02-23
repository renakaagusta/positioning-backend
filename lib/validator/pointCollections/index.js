"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvariantError_1 = __importDefault(require("../../exceptions/InvariantError"));
const schema_1 = __importDefault(require("./schema"));
const PointCollectionsValidator = {
    validatePointCollectionPayload: (payload) => {
        const validationResult = schema_1.default.validate(payload);
        if (validationResult.error) {
            throw new InvariantError_1.default(validationResult.error.message);
        }
    },
};
exports.default = PointCollectionsValidator;
