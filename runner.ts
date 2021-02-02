/**
 * Module Dependencies
 */
import Logger from '@lib/logger';
import config from '@config';
import App from 'App';

App.listen(config.get('SERVER_PORT'), () =>
  Logger.info(`Listening on http://localhost:${config.get('SERVER_PORT')}`),
);
