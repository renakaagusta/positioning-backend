import {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} from './schema';
import InvariantError from "../../exceptions/InvariantError";

export interface AuthenticationsValidatorInterface {
  validatePostAuthenticationPayload: (payload: any) => void,
  validatePutAuthenticationPayload: (payload: any) => void,
  validateDeleteAuthenticationPayload: (payload: any) => void,
};

const AuthenticationsValidator: AuthenticationsValidatorInterface = {
  validatePostAuthenticationPayload: (payload: any) => {
    const validationResult = PostAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutAuthenticationPayload: (payload: any) => {
    const validationResult = PutAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteAuthenticationPayload: (payload: any) => {
    const validationResult = DeleteAuthenticationPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default AuthenticationsValidator