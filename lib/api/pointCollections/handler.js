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
class PointCollectionsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this.postPointCollectionHandler = this.postPointCollectionHandler.bind(this);
        this.getPointCollectionsHandler = this.getPointCollectionsHandler.bind(this);
        this.getPointCollectionByIdHandler = this.getPointCollectionByIdHandler.bind(this);
        this.putPointCollectionHandler = this.putPointCollectionHandler.bind(this);
        this.deletePointCollectionHandler = this.deletePointCollectionHandler.bind(this);
    }
    postPointCollectionHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._validator.validatePointCollectionPayload(request.payload);
                const { type, latitudes, longitudes } = request.payload;
                const data = latitudes.map((latitude, index) => ({
                    id: index,
                    geometry: {
                        coordinates: [
                            longitudes[index],
                            latitude
                        ],
                        type: 'Point',
                    },
                    poperties: {
                        text: 'Point'
                    },
                    type: 'Features'
                }));
                const pointCollection = {
                    type: type,
                    data: data
                };
                const pointCollectionId = yield this._service.addPointCollection(pointCollection);
                const response = h.response({
                    status: 'success',
                    message: 'Titik berhasil di',
                    data: {
                        pointCollectionId,
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
    getPointCollectionsHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            const pointCollections = yield this._service.getPointCollectionList();
            return {
                status: 'success',
                data: {
                    pointCollections,
                },
            };
        });
    }
    getPointCollectionByIdHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const pointCollection = yield this._service.getPointCollectionById(id);
                return {
                    status: 'success',
                    data: {
                        pointCollection,
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
    putPointCollectionHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._validator.validatePointCollectionPayload(request.payload);
                const { id } = request.params;
                const { type, latitudes, longitudes } = request.payload;
                const data = latitudes.map((latitude, index) => ({
                    id: index,
                    geometry: {
                        coordinates: [
                            longitudes[index],
                            latitude
                        ],
                        type: 'Point',
                    },
                    poperties: {
                        text: 'Point'
                    },
                    type: 'Features'
                }));
                const pointCollection = {
                    id: id,
                    type: type,
                    data: data
                };
                const pointCollectionId = yield this._service.updatePointCollection(pointCollection);
                const response = h.response({
                    status: 'success',
                    message: 'Titik berhasil diperbarui',
                    data: {
                        pointCollectionId,
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
    deletePointCollectionHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, data } = request.payload;
                const { id } = request.params;
                const pointCollectionId = yield this._service.deletePointCollection(id);
                const response = h.response({
                    status: 'success',
                    message: 'Titik berhasil dihapus',
                    data: {
                        pointCollectionId,
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
exports.default = PointCollectionsHandler;
