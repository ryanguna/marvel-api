/**
 * Module Dependencies
 */
import { fromJS } from 'immutable';

type LogLevel =
  | 'silent'
  | 'error'
  | 'warn'
  | 'info'
  | 'http'
  | 'verbose'
  | 'debug'
  | 'silly';

export default fromJS({
  PROJECT_NAME: process.env.PROJECT_NAME || 'marvel-api',

  SERVER_PORT: process.env.SERVER_PORT || 3000,

  MARVEL_API_BASE_URL:
    process.env.MARVEL_API_BASE_URL || 'https://gateway.marvel.com',
  MARVEL_API_PUBLIC_KEY: process.env.MARVEL_API_PUBLIC_KEY || '',
  MARVEL_API_PRIVATE_KEY: process.env.MARVEL_API_PRIVATE_KEY || '',

  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_CACHE_TTL_IN_SECONDS: parseInt(
    process.env.REDIS_CACHE_TTL_IN_SECONDS || '3600', // Default 1 hour
    10,
  ),

  DEBUG_LOG_ENABLED:
    process.env.DEBUG_LOG_ENABLED === 'true' ||
    process.env.DEBUG_LOG_ENABLED === '1',
  DEBUG_LOG_LEVEL: (process.env.DEBUG_LOG_LEVEL || 'debug') as LogLevel,
});
