/**
 * Module Dependencies
 */
import Redis from 'ioredis';

import config from '@config';
import Logger from '@lib/logger';

export default new Redis({
  host: config.get('REDIS_HOST'),
  password: config.get('REDIS_PASSWORD'),
  port: config.get('REDIS_PORT'),
}).on('error', (err: Error) =>
  Logger.error('Error from Redis', { error: err }),
);
