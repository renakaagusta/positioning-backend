import ClientError from "../../exceptions/ClientError";
import { RouteCollectionInterface, RouteInterface } from "../../model/routeCollection";
import RouteCollectionsService from "../../services/firestore/RouteCollectionsService";
import { RouteCollectionValidatorInterface } from "../../validator/routeCollections";

export interface RouteCollectionHandlerInterface {
    _service: RouteCollectionsService
    _validator: RouteCollectionValidatorInterface;

    postRouteCollectionHandler: (request: any, h: any) => void;
    getRouteCollectionsHandler: (request: any, h: any) => void;
    getRouteCollectionByIdHandler: (request: any, h: any) => void;
    putRouteCollectionHandler: (request: any, h: any) => void;
    deleteRouteCollectionHandler: (request: any, h: any) => void;
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
        this.putRouteCollectionHandler = this.putRouteCollectionHandler.bind(this);
        this.deleteRouteCollectionHandler = this.deleteRouteCollectionHandler.bind(this);
    }

    async postRouteCollectionHandler(request: any, h: any) {
        try {
            this._validator.validateRouteCollectionPayload(request.payload);
            const { type, routes } = request.payload;

            const routeCollection: RouteCollectionInterface = {
                type: type as string,
                routes: routes as Array<RouteInterface>
            }

            const routeCollectionId = await this._service.addRouteCollection(routeCollection);

            const response = h.response({
                status: 'success',
                message: 'Rute berhasil ditambahkan',
                data: {
                    routeCollectionId,
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

    async getRouteCollectionsHandler() {
        const routeCollections = await this._service.getRouteCollectionList();
        return {
            status: 'success',
            data: {
                routeCollections,
            },
        };
    }

    async getRouteCollectionByIdHandler(request: any, h: any) {
        try {
            const { id } = request.params;
            const routeCollection = await this._service.getRouteCollectionById(id);
            return {
                status: 'success',
                data: {
                    routeCollection,
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

    async putRouteCollectionHandler(request: any, h: any) {
        try {
            this._validator.validateRouteCollectionPayload(request.payload);
            const { id } = request.payload;
            const { type, routes } = request.payload;

            const routeCollection: RouteCollectionInterface = {
                id: id,
                type: type as string,
                routes: routes as Array<RouteInterface>
            }

            const routeCollectionId = await this._service.updateRouteCollection(routeCollection);

            const response = h.response({
                status: 'success',
                message: 'Rute berhasil diperbarui',
                data: {
                    routeCollectionId,
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

    async deleteRouteCollectionHandler(request: any, h: any) {
        try {
            const { id } = request.params;

            const routeCollectionId = await this._service.deleteRouteCollection(id);

            const response = h.response({
                status: 'success',
                message: 'Rute berhasil dihapus',
                data: {
                    routeCollectionId,
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
}

export default RouteCollectionsHandler;