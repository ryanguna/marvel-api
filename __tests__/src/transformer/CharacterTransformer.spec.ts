import CharacterTransformer from 'transformer/CharacterTransformer';
import ICharacter from 'interface/ICharacter';

describe('transformer/CharacterTransformer', () => {
  describe('#transformCharacters()', () => {
    it('should return an array of string ids', () => {
      const characters: ICharacter[] = [
        {
          id: '123',
          name: 'test',
          description: 'description',
        },
      ];

      const result = CharacterTransformer.transformCharacters(characters);

      expect(result).toStrictEqual(['123']);
    });
  });

  describe('#transformCharacter()', () => {
    it('should return a single ICharacter from a collection', () => {
      const characters: ICharacter[] = [
        {
          id: '123',
          name: 'test',
          description: 'description',
        },
      ];

      const result = CharacterTransformer.transformCharacter(characters);

      expect(result).toMatchObject({
        id: '123',
        name: 'test',
        description: 'description',
      });
    });
  });
});
