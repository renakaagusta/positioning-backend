import InvariantError from "../../exceptions/InvariantError";
import UserPayloadSchema from "./schema";

export interface UsersValidatorInterface {
  validateUserPayload: (payload: any) => void
}

const UsersValidator: UsersValidatorInterface = {
  validateUserPayload: (payload: any) => {
    const validationResult = UserPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }

    return validationResult
  },
};

export default UsersValidator