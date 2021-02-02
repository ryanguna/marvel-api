/**
 * Module Dependencies
 */
import winston from 'winston';

import config from '@config';

const logger = winston.createLogger({
  level: config.get('DEBUG_LOG_LEVEL'),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
  ),
  defaultMeta: { service: config.get('PROJECT_NAME') },
});

logger.add(
  new winston.transports.Console({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston.format.simple(),
  }),
);

export default logger;
