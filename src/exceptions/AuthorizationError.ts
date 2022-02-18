import ClientError, { ErrorInterface} from './ClientError'

class AuthorizationError extends ClientError implements ErrorInterface {
  constructor(message: string) {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

module.exports = AuthorizationError;
