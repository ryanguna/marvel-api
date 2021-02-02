/**
 * Module Dependencies
 */
import Bluebird from 'bluebird';

import MarvelApiGateway from 'gateway/MarvelApiGateway';
import IResponse from 'interface/gateway/marvel/IResponse';

/**
 * Class to handle all character data operations
 *
 * @default
 * @memberOf CharacterService
 */
export default class CharacterService {
  /**
   * Returns all characters from Marvel API
   *
   * @static
   * @param limit number
   * @param offset number
   * @param etag string
   * @returns Bluebird<IResponse>
   * @memberOf CharacterService
   */
  public static getAllCharacters(
    limit: number,
    offset: number,
    etag: string,
  ): Bluebird<IResponse> {
    return MarvelApiGateway.getAllCharacters(limit, offset, etag);
  }

  /**
   * Returns a specific character
   *
   * @static
   * @param characterId number
   * @returns Bluebird<IResponse>
   * @memberOf CharacterService
   */
  public static getCharacter(characterId: number): Bluebird<IResponse> {
    return MarvelApiGateway.getCharacter(characterId);
  }
}
