/**
 * Module Dependencies
 */

import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import Bluebird from 'bluebird';
import { StatusCodes } from 'http-status-codes';

import CharacterService from 'service/CharacterService';
import CharacterTransformer from 'transformer/CharacterTransformer';
import RedisService from 'service/RedisService';
import NotFoundError from 'error/NotFoundError';

export default class CharacterController {
  /**
   * Handler for GET /characters
   * Returns all characters from cache or Marvel API request
   *
   * @static
   * @param request Request
   * @param response Response
   * @param next NextFunction
   * @returns Bluebird<void>
   * @memberOf CharacterController
   */
  public static async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Bluebird<void> {
    const url = request.originalUrl;
    const limit = _.get(request.query, 'limit', 100) as number;
    const offset = _.get(request.query, 'offset', 0) as number;

    await Bluebird.try(() => RedisService.getEtag(url))
      .then(etag => CharacterService.getAllCharacters(limit, offset, etag))
      .then(async ({ statusCode, body }) => {
        switch (statusCode) {
          case StatusCodes.OK:
            await RedisService.setEtag(url, body.etag);
            await RedisService.setCachedData(url, body.data.results);
            return body.data.results;
          case StatusCodes.NOT_MODIFIED:
            return RedisService.getCachedData(url);
          default:
            throw new Error(`Unhandled API status code ${body}`);
        }
      })
      .then(characters => CharacterTransformer.transformCharacters(characters))
      .then(payload => response.status(StatusCodes.OK).json(payload))
      .catch(err => next(err));
  }

  /**
   * Handler for GET /characters
   * Returns all characters from cache or Marvel API request
   *
   * @static
   * @async
   * @param request Request
   * @param response Response
   * @param next NextFunction
   * @throws NotFoundError
   * @returns Bluebird<void>
   * @memberOf CharacterController
   */
  public static async show(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Bluebird<void> {
    const characterId = parseInt(request.params.id, 10);

    await Bluebird.try(() => CharacterService.getCharacter(characterId))
      .then(({ statusCode, body }) => {
        switch (statusCode) {
          case StatusCodes.OK:
            return body.data.results;
          case StatusCodes.NOT_FOUND:
            throw new NotFoundError(`Resource id ${characterId} not found`);
          default:
            throw new Error(`Unhandled API status code ${body}`);
        }
      })
      .then(characters => CharacterTransformer.transformCharacter(characters))
      .then(payload => response.status(StatusCodes.OK).json(payload))
      .catch(err => next(err));
  }
}
