import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import HttpError from 'error/HttpError';

export default class NotFoundError extends HttpError {
  constructor(message: string = getReasonPhrase(StatusCodes.NOT_FOUND)) {
    super(StatusCodes.NOT_FOUND, message);

    this.name = 'NotFoundError';

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
