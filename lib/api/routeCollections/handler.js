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
class RouteCollectionsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this.postRouteCollectionHandler = this.postRouteCollectionHandler.bind(this);
        this.getRouteCollectionsHandler = this.getRouteCollectionsHandler.bind(this);
        this.getRouteCollectionByIdHandler = this.getRouteCollectionByIdHandler.bind(this);
        this.putRouteCollectionHandler = this.putRouteCollectionHandler.bind(this);
        this.deleteRouteCollectionHandler = this.deleteRouteCollectionHandler.bind(this);
    }
    postRouteCollectionHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._validator.validateRouteCollectionPayload(request.payload);
                const { type, routes } = request.payload;
                const routeCollection = {
                    type: type,
                    routes: routes
                };
                const routeCollectionId = yield this._service.addRouteCollection(routeCollection);
                const response = h.response({
                    status: 'success',
                    message: 'Rute berhasil ditambahkan',
                    data: {
                        routeCollectionId,
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
    getRouteCollectionsHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            const routeCollections = yield this._service.getRouteCollectionList();
            return {
                status: 'success',
                data: {
                    routeCollections,
                },
            };
        });
    }
    getRouteCollectionByIdHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const routeCollection = yield this._service.getRouteCollectionById(id);
                return {
                    status: 'success',
                    data: {
                        routeCollection,
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
    putRouteCollectionHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._validator.validateRouteCollectionPayload(request.payload);
                const { id } = request.payload;
                const { type, routes } = request.payload;
                const routeCollection = {
                    id: id,
                    type: type,
                    routes: routes
                };
                const routeCollectionId = yield this._service.updateRouteCollection(routeCollection);
                const response = h.response({
                    status: 'success',
                    message: 'Rute berhasil diperbarui',
                    data: {
                        routeCollectionId,
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
    deleteRouteCollectionHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const routeCollectionId = yield this._service.deleteRouteCollection(id);
                const response = h.response({
                    status: 'success',
                    message: 'Rute berhasil dihapus',
                    data: {
                        routeCollectionId,
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
exports.default = RouteCollectionsHandler;
