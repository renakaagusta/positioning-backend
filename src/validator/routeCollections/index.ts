import InvariantError from '../../exceptions/InvariantError';
import RouteCollectionPayloadSchema from './schema';

export interface RouteCollectionValidatorInterface {
    validateRouteCollectionPayload: (payload: any) => void
}

const RouteCollectionsValidator: RouteCollectionValidatorInterface = {
    validateRouteCollectionPayload: (payload: any) => {
        const validationResult = RouteCollectionPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

export default RouteCollectionsValidator