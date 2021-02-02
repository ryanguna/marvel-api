class HttpError extends Error {
  status: number;

  message: string;

  errors: [];

  constructor(status: number, message: string, errors: [] = []) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}

export default HttpError;
