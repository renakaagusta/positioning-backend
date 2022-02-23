import InvariantError from '../../exceptions/InvariantError';
import PointCollectionPayloadSchema from './schema';

export interface PointCollectionValidatorInterface {
    validatePointCollectionPayload: (payload: any) => void
}

const PointCollectionsValidator: PointCollectionValidatorInterface = {
    validatePointCollectionPayload: (payload: any) => {
        const validationResult = PointCollectionPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

export default PointCollectionsValidator