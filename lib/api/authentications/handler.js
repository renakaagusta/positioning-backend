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
const ClientError = require('../../exceptions/ClientError');
class AuthenticationsHandler {
    constructor(authenticationsService, usersService, tokenManager, validator) {
        this._authenticationsService = authenticationsService;
        this._usersService = usersService;
        this._tokenManager = tokenManager;
        this._validator = validator;
        this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
        this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
        this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
    }
    postAuthenticationHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._validator.validatePostAuthenticationPayload(request.payload);
                const { username, password } = request.payload;
                const id = yield this._usersService.verifyUserCredential(username, password);
                const accessToken = this._tokenManager.generateAccessToken({ id });
                const refreshToken = this._tokenManager.generateRefreshToken({ id });
                yield this._authenticationsService.addRefreshToken(refreshToken);
                const response = h.response({
                    status: 'success',
                    message: 'Authentication berhasil ditambahkan',
                    data: {
                        accessToken,
                        refreshToken,
                    },
                });
                response.code(201);
                return response;
            }
            catch (error) {
                if (error instanceof ClientError) {
                    const response = h.response({
                        status: 'fail',
                        message: error.message,
                    });
                    response.code(error.statusCode);
                    return response;
                }
                // Server ERROR!
                const response = h.response({
                    status: 'error',
                    message: 'Maaf, terjadi kegagalan pada server kami.',
                });
                response.code(500);
                return response;
            }
        });
    }
    putAuthenticationHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._validator.validatePutAuthenticationPayload(request.payload);
                const { refreshToken } = request.payload;
                yield this._authenticationsService.verifyRefreshToken(refreshToken);
                const { id } = this._tokenManager.verifyRefreshToken(refreshToken);
                const accessToken = this._tokenManager.generateAccessToken({ id });
                return {
                    status: 'success',
                    message: 'Access Token berhasil diperbarui',
                    data: {
                        accessToken,
                    },
                };
            }
            catch (error) {
                if (error instanceof ClientError) {
                    const response = h.response({
                        status: 'fail',
                        message: error.message,
                    });
                    response.code(error.statusCode);
                    return response;
                }
                // Server ERROR!
                const response = h.response({
                    status: 'error',
                    message: 'Maaf, terjadi kegagalan pada server kami.',
                });
                response.code(500);
                return response;
            }
        });
    }
    deleteAuthenticationHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._validator.validateDeleteAuthenticationPayload(request.payload);
                const { refreshToken } = request.payload;
                yield this._authenticationsService.verifyRefreshToken(refreshToken);
                yield this._authenticationsService.deleteRefreshToken(refreshToken);
                return {
                    status: 'success',
                    message: 'Refresh token berhasil dihapus',
                };
            }
            catch (error) {
                if (error instanceof ClientError) {
                    const response = h.response({
                        status: 'fail',
                        message: error.message,
                    });
                    response.code(error.statusCode);
                    return response;
                }
                // Server ERROR!
                const response = h.response({
                    status: 'error',
                    message: 'Maaf, terjadi kegagalan pada server kami.',
                });
                response.code(500);
                return response;
            }
        });
    }
}
exports.default = AuthenticationsHandler;
