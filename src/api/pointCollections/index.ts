import PointCollectionsService from '../../services/firestore/PointCollectionsService';
import { PointCollectionValidatorInterface } from '../../validator/pointCollections';
import PointCollectionsHandler from './handler';
import routes from './routes';

export interface PointCollectionPluginParamsInterface {
    service: PointCollectionsService
    validator: PointCollectionValidatorInterface
  }

export default {
    name: 'pointCollections',
    version: '1.0.0',
    register: async(server: any, params: PointCollectionPluginParamsInterface) => {
        const pointCollectionsHandler = new PointCollectionsHandler(params.service, params.validator);
        server.route(routes(pointCollectionsHandler));
    },
};