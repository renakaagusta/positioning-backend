import ClientError from "../../exceptions/ClientError";
import { RouteCollectionInterface, RouteInterface } from "../../model/route";
import RouteCollectionsService from "../../services/firestore/RouteCollectionsService";
import { RouteCollectionValidatorInterface } from "../../validator/routeCollections";

export interface RouteCollectionHandlerInterface {
    _service: RouteCollectionsService
    _validator: RouteCollectionValidatorInterface;

    postRouteCollectionHandler: (request: any, h: any) => void;
    getRouteCollectionsHandler: (request: any, h: any) => void;
    getRouteCollectionByIdHandler: (request: any, h: any) => void;
}

class RouteCollectionsHandler implements RouteCollectionHandlerInterface {
    _service: RouteCollectionsService;
    _validator: RouteCollectionValidatorInterface;
    constructor(service: RouteCollectionsService, validator: RouteCollectionValidatorInterface) {
        this._service = service;
        this._validator = validator;

        this.postRouteCollectionHandler = this.postRouteCollectionHandler.bind(this);
        this.getRouteCollectionsHandler = this.getRouteCollectionsHandler.bind(this);
        this.getRouteCollectionByIdHandler = this.getRouteCollectionByIdHandler.bind(this);
    }

    async postRouteCollectionHandler(request: any, h: any) {
        try {
            this._validator.validateRouteCollectionPayload(request.payload);
            const { type, data } = request.payload;

            const poinCollection: RouteCollectionInterface = {
                type: type as string,
                data: data as Array<RouteInterface>
            }

            const poinCollectionId = await this._service.addRouteCollection(poinCollection);

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
            console.log(error)
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

    async getRouteCollectionsHandler() {
        const poinCollections = await this._service.getRouteCollectionList();
        return {
            status: 'success',
            data: {
                poinCollections,
            },
        };
    }

    async getRouteCollectionByIdHandler(request: any, h: any) {
        try {
            const { id } = request.params;
            const poinCollection = await this._service.getRouteCollectionById(id);
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

export default RouteCollectionsHandler;