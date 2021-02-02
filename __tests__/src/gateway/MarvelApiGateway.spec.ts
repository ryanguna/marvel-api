import MarvelApiGateway from 'gateway/MarvelApiGateway';

const request = require('request-promise'); // tslint:disable-line no-var-requires

describe('gateway/MarvelApiGateway', () => {
  afterEach(() => {
    request.mockReset();
  });

  describe('#getAllCharacters()', () => {
    it('should return proper parsed json on success', async () => {
      const expectedBody = {
        test: 'test',
      };
      request.mockResolvedValueOnce({
        statusCode: 200,
        body: JSON.stringify(expectedBody),
      });

      await expect(
        MarvelApiGateway.getAllCharacters(10, 0, '1234'),
      ).resolves.toEqual({ statusCode: 200, body: expectedBody });
    });

    it('should return empty array if body is empty', async () => {
      request.mockResolvedValueOnce({
        statusCode: 200,
        body: '',
      });

      await expect(
        MarvelApiGateway.getAllCharacters(10, 0, '1234'),
      ).resolves.toEqual({ statusCode: 200, body: [] });
    });
  });

  describe('#getCharacter()', () => {
    it('should return proper parsed json on success', async () => {
      const expectedBody = {
        test: 'test',
      };
      request.mockResolvedValueOnce({
        statusCode: 200,
        body: JSON.stringify(expectedBody),
      });

      await expect(MarvelApiGateway.getCharacter(10)).resolves.toEqual({
        statusCode: 200,
        body: expectedBody,
      });
    });

    it('should return empty array if body is empty', async () => {
      request.mockResolvedValueOnce({
        statusCode: 200,
        body: '',
      });

      await expect(MarvelApiGateway.getCharacter(10)).resolves.toEqual({
        statusCode: 200,
        body: [],
      });
    });
  });
});
