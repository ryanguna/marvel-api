import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import NotFoundError from 'error/NotFoundError';
import HttpError from 'error/HttpError';

describe('error/NotFoundError', () => {
  it('should instanceof HttpError', () => {
    const error = new NotFoundError();

    expect(error).toBeInstanceOf(HttpError);
  });

  it('should match code and message if no constructor has been set', () => {
    const error = new NotFoundError();
    const expected = {
      status: StatusCodes.NOT_FOUND,
      message: getReasonPhrase(StatusCodes.NOT_FOUND),
    };

    expect(error.status).toEqual(expected.status);
    expect(error.message).toEqual(expected.message);
  });
});
