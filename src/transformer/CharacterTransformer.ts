/**
 * Module Dependencies
 */
import _ from 'lodash';

import ICharacter from 'interface/ICharacter';

export default class CharacterTransformer {
  /**
   * Transforms to an array of character ids
   *
   * @static
   * @param characters ICharacter[]
   * @returns any
   * @memberOf CharacterTransformer
   */
  public static transformCharacters(characters: ICharacter[]): any {
    return _.map(characters, 'id');
  }

  /**
   * Transform to a ICharacter
   *
   * @static
   * @param characters ICharacter
   * @returns any
   * @memberOf CharacterTransformer
   */
  public static transformCharacter(characters: ICharacter[]): any {
    return _(characters)
      .map((character: any) => ({
        id: character.id,
        name: character.name,
        description: character.description,
      }))
      .head();
  }
}
