export interface ErrorInterface {
  statusCode: number,
  name: string
}

class ClientError extends Error implements ErrorInterface {
  public statusCode: number
  public name: string

  constructor(message: string, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
    this.name = 'ClientError'
  }
}

export default ClientError