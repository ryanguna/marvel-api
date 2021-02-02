import RedisService from 'service/RedisService';

const redis = require('@lib/redis').default; // tslint:disable-line no-var-requires

describe('service/RedisService', () => {
  afterEach(() => {
    redis.hget.mockReset();
    redis.hset.mockReset();
    redis.pipeline.mockReset();
  });

  describe('#getEtag', () => {
    it('should return empty when key is not found', async () => {
      await expect(RedisService.getEtag('/example/url')).resolves.toEqual('');

      expect(redis.hget).toHaveBeenCalledTimes(1);
      expect(redis.hget.mock.calls[0][0]).toMatchSnapshot();
      expect(redis.hget.mock.calls[0][1]).toMatchSnapshot();
    });

    it('should return an etag string if key is found', async () => {
      const expectedEtag = 'f0fbae65eb2f8f28bdeea0a29be8749a4e67acb3';
      redis.hget.mockResolvedValueOnce(expectedEtag);

      await expect(RedisService.getEtag('/example/url')).resolves.toEqual(
        expectedEtag,
      );

      expect(redis.hget).toHaveBeenCalledTimes(1);
      expect(redis.hget.mock.calls[0][0]).toMatchSnapshot();
      expect(redis.hget.mock.calls[0][1]).toMatchSnapshot();
    });
  });

  describe('#getCachedData', () => {
    it('should return empty array when key is not found', async () => {
      await expect(RedisService.getCachedData('/example/url')).resolves.toEqual(
        [],
      );

      expect(redis.hget).toHaveBeenCalledTimes(1);
      expect(redis.hget.mock.calls[0][0]).toMatchSnapshot();
      expect(redis.hget.mock.calls[0][1]).toMatchSnapshot();
    });

    it('should return a parsed json object if key is found', async () => {
      const expectedObject = [
        {
          hello: 'world',
        },
      ];

      await redis.hget.mockResolvedValueOnce(JSON.stringify(expectedObject));

      await expect(RedisService.getCachedData('/example/url')).resolves.toEqual(
        expectedObject,
      );

      expect(redis.hget).toHaveBeenCalledTimes(1);
      expect(redis.hget.mock.calls[0][0]).toMatchSnapshot();
      expect(redis.hget.mock.calls[0][1]).toMatchSnapshot();
    });
  });
});
