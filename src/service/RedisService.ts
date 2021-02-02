/**
 * Module Dependencies
 */
import Bluebird from 'bluebird';
import crypto from 'crypto';

import config from '@config';
import redis from '@lib/redis';

/**
 * Class to handle all redis operations
 *
 * @default
 * @memberOf RedisService
 */
export default class RedisService {
  protected static MARVEL_BUCKET_KEY = 'marvel';

  protected static ETAG_FIELD = 'etag';

  protected static DATA_FIELD = 'data';

  /**
   * Caches etag with request url as key
   *
   * @static
   * @async
   * @param url string
   * @param etag string
   * @returns {Bluebird<void>}
   * @memberOf RedisService
   */
  public static async setEtag(url: string, etag: string): Bluebird<void> {
    const key = RedisService.buildKey(url);

    await redis.hset(key, RedisService.ETAG_FIELD, etag);
    await redis.expire(key, config.get('REDIS_CACHE_TTL_IN_SECONDS'));
  }

  /**
   * Gets etag from cache
   *
   * @static
   * @async
   * @param url string
   * @returns string
   * @memberOf RedisService
   */
  public static async getEtag(url: string): Bluebird<string> {
    const key = RedisService.buildKey(url);
    const etag = await redis.hget(key, RedisService.ETAG_FIELD);

    return etag || '';
  }

  /**
   * Gets cached response
   *
   * @static
   * @async
   * @param url string
   * @returns string
   * @memberOf RedisService
   */
  public static async getCachedData(url: string): Bluebird<[]> {
    const key = RedisService.buildKey(url);
    const response = await redis.hget(key, RedisService.DATA_FIELD);

    return response ? JSON.parse(response) : [];
  }

  /**
   * Sets cached response
   *
   * @static
   * @async
   * @param url string
   * @param data any
   * @returns string
   * @memberOf RedisService
   */
  public static async setCachedData(url: string, data: any): Bluebird<void> {
    const key = RedisService.buildKey(url);
    const value = JSON.stringify(data);
    const pipeline = redis.pipeline();

    pipeline.hset(key, RedisService.DATA_FIELD, value);
    pipeline.expire(key, config.get('REDIS_CACHE_TTL_IN_SECONDS'));

    await pipeline.exec();
  }

  /**
   * Creates a key from url
   *
   * @static
   * @param url string
   * @returns string
   * @memberOf RedisService
   */
  private static buildKey(url: string): string {
    const hashedUrl = crypto
      .createHash('md5')
      .update(`url:${url}`)
      .digest('hex');

    return `${RedisService.MARVEL_BUCKET_KEY}:${hashedUrl}`;
  }
}
