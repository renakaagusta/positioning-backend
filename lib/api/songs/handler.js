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
const ClientError = require('../../exceptions/ClientError');
class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }
    postSongHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._validator.validateSongPayload(request.payload);
                const { title, year, performer, genre, duration } = request.payload;
                const songId = yield this._service.addSong({ title, year, performer, genre, duration });
                const response = h.response({
                    status: 'success',
                    message: 'Lagu berhasil ditambahkan',
                    data: {
                        songId,
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
    getSongsHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield this._service.getSongs();
            return {
                status: 'success',
                data: {
                    songs,
                },
            };
        });
    }
    getSongByIdHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const song = yield this._service.getSongById(id);
                return {
                    status: 'success',
                    data: {
                        song,
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
    putSongByIdHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this._validator.validateSongPayload(request.payload);
                const { id } = request.params;
                yield this._service.editSongById(id, request.payload);
                return {
                    status: 'success',
                    message: 'Catatan berhasil diperbarui',
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
    deleteSongByIdHandler(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                yield this._service.deleteSongById(id);
                return {
                    status: 'success',
                    message: 'Catatan berhasil dihapus',
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
module.exports = SongsHandler;
