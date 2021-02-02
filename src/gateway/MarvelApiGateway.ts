/**
 * Module Dependencies
 */
import Bluebird from 'bluebird';
import moment from 'moment-timezone';
import _ from 'lodash';
import crypto from 'crypto';
import util from 'util';
import request from 'request-promise';

import config from '@config';
import IResponse from 'interface/gateway/marvel/IResponse';

/**
 * Gateway class to handle all Marvel API requests
 *
 * @default
 * @memberOf MarvelApiGateway
 */
export default class MarvelApiGateway {
  /**
   * Gets all marvel characters
   * Marvel API endpoint /v1/public/characters
   *
   * @static
   * @async
   * @param limit number
   * @param offset number
   * @param eTag string
   * @returns Bluebird<IResponse>
   * @memberOf MarvelApiGateway
   */
  public static async getAllCharacters(
    limit = 100,
    offset = 0,
    eTag: string,
  ): Bluebird<IResponse> {
    const uri = [
      config.get('MARVEL_API_BASE_URL'),
      'v1',
      'public',
      'characters',
    ].join('/');

    const timestamp = moment()
      .valueOf()
      .toString();

    const hash = MarvelApiGateway.generateApiHash(timestamp);

    const response = await request(uri, {
      method: 'GET',
      headers: {
        'If-None-Match': eTag,
      },
      qs: {
        limit,
        offset,
        ts: timestamp,
        apikey: config.get('MARVEL_API_PUBLIC_KEY'),
        hash,
      },
      json: false,
      simple: false,
      resolveWithFullResponse: true,
    });

    return {
      statusCode: parseInt(response.statusCode, 10),
      body: !_.isEmpty(response.body) ? JSON.parse(response.body) : [],
    };
  }

  /**
   * Gets a specific marvel character
   * Marvel API endpoint /v1/public/characters/{characterId}
   *
   * @static
   * @async
   * @param characterId number
   * @returns Bluebird<IResponse>
   * @memberOf MarvelApiGateway
   */
  public static async getCharacter(characterId: number): Bluebird<IResponse> {
    const uri = [
      config.get('MARVEL_API_BASE_URL'),
      'v1',
      'public',
      'characters',
      characterId,
    ].join('/');

    const timestamp = moment()
      .valueOf()
      .toString();

    const hash = MarvelApiGateway.generateApiHash(timestamp);

    const response = await request(uri, {
      method: 'GET',
      qs: {
        ts: timestamp,
        apikey: config.get('MARVEL_API_PUBLIC_KEY'),
        hash,
      },
      json: false,
      simple: false,
      resolveWithFullResponse: true,
    });

    return {
      statusCode: parseInt(response.statusCode, 10),
      body: !_.isEmpty(response.body) ? JSON.parse(response.body) : [],
    };
  }

  /**
   * Generates an api hash for accessing Marvel API
   *
   * hash (md5) = timestamp + maravel_private_key + marvel_api_public_key
   *
   * @private
   * @static
   * @param timestamp string
   * @returns string
   * @memberOf MarvelApiGateway
   */
  private static generateApiHash(timestamp: string): string {
    const preHash = util.format(
      '%s%s%s',
      timestamp,
      config.get('MARVEL_API_PRIVATE_KEY'),
      config.get('MARVEL_API_PUBLIC_KEY'),
    );

    return crypto
      .createHash('md5')
      .update(preHash)
      .digest('hex');
  }
}
