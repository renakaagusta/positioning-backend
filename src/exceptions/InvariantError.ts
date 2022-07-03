import ClientError from './ClientError'

class InvariantError extends ClientError {
  constructor(message: string) {
    super(message, 401)
    this.name = 'InvariantError'
  }
}

export default InvariantError