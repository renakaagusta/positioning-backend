import { string } from "joi";
import ClientError from "../../exceptions/ClientError";
import { PointCollectionInterface, PointInterface } from "../../model/point";
import PointCollectionsService from "../../services/firestore/PointCollectionsService";
import { PointCollectionValidatorInterface } from "../../validator/pointCollections";

export interface PointCollectionHandlerInterface {
    _service: PointCollectionsService
    _validator: PointCollectionValidatorInterface;

    postPointCollectionHandler: (request: any, h: any) => void;
    getPointCollectionsHandler: (request: any, h: any) => void;
    getPointCollectionByIdHandler: (request: any, h: any) => void;
}

class PointCollectionsHandler implements PointCollectionHandlerInterface {
    _service: PointCollectionsService;
    _validator: PointCollectionValidatorInterface;
    constructor(service: PointCollectionsService, validator: PointCollectionValidatorInterface) {
        this._service = service;
        this._validator = validator;

        this.postPointCollectionHandler = this.postPointCollectionHandler.bind(this);
        this.getPointCollectionsHandler = this.getPointCollectionsHandler.bind(this);
        this.getPointCollectionByIdHandler = this.getPointCollectionByIdHandler.bind(this);
    }

    async postPointCollectionHandler(request: any, h: any) {
        try {
            this._validator.validatePointCollectionPayload(request.payload);
            const { type, data } = request.payload;

            const poinCollection: PointCollectionInterface = {
                type: type as string,
                data: data as Array<PointInterface>
            }

            const poinCollectionId = await this._service.addPointCollection(poinCollection);

            const response = h.response({
                status: 'success',
                message: 'Laporan berhasil ditambahkan',
                data: {
                    poinCollectionId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
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
    }

    async getPointCollectionsHandler() {
        const poinCollections = await this._service.getPointCollectionList();
        return {
            status: 'success',
            data: {
                poinCollections,
            },
        };
    }

    async getPointCollectionByIdHandler(request: any, h: any) {
        try {
            const { id } = request.params;
            const poinCollection = await this._service.getPointCollectionById(id);
            return {
                status: 'success',
                data: {
                    poinCollection,
                },
            };
        } catch (error) {
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
    }
}

export default PointCollectionsHandler;