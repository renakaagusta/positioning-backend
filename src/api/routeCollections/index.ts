import RouteCollectionsService from '../../services/firestore/RouteCollectionsService';
import { RouteCollectionValidatorInterface } from '../../validator/routeCollections';
import RouteCollectionsHandler from './handler';
import routes from './routes';

export interface RouteCollectionPluginParamsInterface {
    service: RouteCollectionsService
    validator: RouteCollectionValidatorInterface
  }

export default {
    name: 'routeCollections',
    version: '1.0.0',
    register: async(server: any, params: RouteCollectionPluginParamsInterface) => {
        const routeCollectionsHandler = new RouteCollectionsHandler(params.service, params.validator);
        server.route(routes(routeCollectionsHandler));
    },
};