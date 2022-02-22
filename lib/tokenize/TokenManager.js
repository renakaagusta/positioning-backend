"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("@hapi/jwt"));
const InvariantError_1 = __importDefault(require("../exceptions/InvariantError"));
const TokenManager = {
    generateAccessToken: (payload) => jwt_1.default.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
    generateRefreshToken: (payload) => jwt_1.default.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
    verifyRefreshToken: (refreshToken) => {
        try {
            const artifacts = jwt_1.default.token.decode(refreshToken);
            jwt_1.default.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
            const { payload } = artifacts.decoded;
            return payload;
        }
        catch (error) {
            throw new InvariantError_1.default('Refresh token tidak valid');
        }
    },
};
exports.default = TokenManager;
