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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientError_1 = __importDefault(require("../../exceptions/ClientError"));
class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this.postUserHandler = this.postUserHandler.bind(this);
        this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
        this.getUsersHandler = this.getUsersHandler.bind(this);
        this.putUserHandler = this.putUserHandler.bind(this);
        this.deleteUserHandler = this.deleteUserHandler.bind(this);
    }
    postUserHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._validator.validateUserPayload(request.payload);
                const { username, password, name, email, role, latitude, longitude } = request.payload;
                const user = {
                    username: username,
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    createdAt: new Date(),
                    meta: {
                        location: {
                            static: {
                                latitude: latitude ? latitude : 0,
                                longitude: longitude ? longitude : 0,
                            },
                            dynamic: {
                                latitude: 0,
                                longitude: 0,
                            }
                        }
                    }
                };
                const userId = yield this._service.addUser(user);
                const response = h.response({
                    status: 'success',
                    message: 'User berhasil ditambahkan',
                    data: {
                        userId,
                    },
                });
                response.code(201);
                return response;
            }
            catch (error) {
                if (error instanceof ClientError_1.default) {
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
    getUserByIdHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const user = yield this._service.getUserById(id);
                return {
                    status: 'success',
                    data: {
                        user,
                    },
                };
            }
            catch (error) {
                if (error instanceof ClientError_1.default) {
                    const response = h.response({
                        status: 'fail',
                        message: error.message,
                    });
                    response.code(error.statusCode);
                    return response;
                }
                // server ERROR!
                const response = h.response({
                    status: 'error',
                    message: 'Maaf, terjadi kegagalan pada server kami.',
                });
                response.code(500);
                return response;
            }
        });
    }
    getUsersHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this._service.getUserList();
                return {
                    status: 'success',
                    data: {
                        users,
                    },
                };
            }
            catch (error) {
                if (error instanceof ClientError_1.default) {
                    const response = h.response({
                        status: 'fail',
                        message: error.message,
                    });
                    response.code(error.statusCode);
                    return response;
                }
                // server ERROR!
                const response = h.response({
                    status: 'error',
                    message: 'Maaf, terjadi kegagalan pada server kami.',
                });
                response.code(500);
                return response;
            }
        });
    }
    putUserHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._validator.validateUserPayload(request.payload);
                const { id } = request.params;
                const { username, password, name, email, latitude, longitude } = request.payload;
                const user = {
                    id: id,
                    name: name,
                    username: username,
                    email: email,
                    password: password,
                    meta: {
                        location: {
                            static: {
                                latitude: latitude ? latitude : 0,
                                longitude: longitude ? longitude : 0,
                            },
                            dynamic: {
                                latitude: 0,
                                longitude: 0,
                            }
                        }
                    }
                };
                const userId = yield this._service.updateUser(user);
                const response = h.response({
                    status: 'success',
                    message: 'User berhasil ditambahkan',
                    data: {
                        userId,
                    },
                });
                response.code(201);
                return response;
            }
            catch (error) {
                console.log(error);
                if (error instanceof ClientError_1.default) {
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
    deleteUserHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const userId = yield this._service.deleteUser(id);
                const response = h.response({
                    status: 'success',
                    message: 'User berhasil dihapus',
                    data: {
                        userId,
                    },
                });
                response.code(201);
                return response;
            }
            catch (error) {
                if (error instanceof ClientError_1.default) {
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
exports.default = UsersHandler;