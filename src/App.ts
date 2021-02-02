/**
 * Module Dependencies
 */
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

import ErrorMiddleware from 'middleware/ErrorMiddleware';
import charactersRouter from 'route/characters';
import indexRouter from 'route/index';

const OpenApiValidator = require('express-openapi-validator');

const apiSpec = 'config/spec/api.spec.yaml';
const swaggerDocument = YAML.load(apiSpec);
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');

app.use('/docs/spec', express.static(apiSpec));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    validateResponses: true, // false by default
  }),
);

app.use('/', indexRouter);
app.use('/characters', charactersRouter);

// Error handling middleware
app.use(ErrorMiddleware.handle);

export default app;
