import ClientError, { ErrorInterface } from "./ClientError";

class AuthenticationError extends ClientError implements ErrorInterface {
  public name: string;

  constructor(message: string) {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

export default AuthenticationError