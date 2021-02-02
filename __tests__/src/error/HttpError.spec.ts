import StatusCodes from 'http-status-codes';

import HttpError from 'error/HttpError';

describe('error/HttpError', () => {
  it('should instanceof Error', () => {
    const error = new HttpError(StatusCodes.NOT_FOUND, 'Not Found');

    expect(error).toBeInstanceOf(Error);
  });

  it('should match the error message', () => {
    const errObject = {
      status: StatusCodes.NOT_FOUND,
      message: 'Not Found',
    };
    const error = new HttpError(errObject.status, errObject.message);

    expect(error.message).toEqual(errObject.message);
    expect(error.status).toEqual(errObject.status);
  });
});
