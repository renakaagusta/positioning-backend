import InvariantError from '../../exceptions/InvariantError';
import ReportPayloadSchema from './schema';

export interface ReportValidatorInterface {
    validateReportPayload: (payload: any) => void
}

const ReportsValidator: ReportValidatorInterface = {
    validateReportPayload: (payload: any) => {
        const validationResult = ReportPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

export default ReportsValidator