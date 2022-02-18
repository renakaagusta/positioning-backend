import ClientError, { ErrorInterface } from "./ClientError";

class NotFoundError extends ClientError implements ErrorInterface {
  public name: string

  constructor(message: string) {
    super(message, 404)
    this.name = "NotFoundError"
  }
}

module.exports = NotFoundError
