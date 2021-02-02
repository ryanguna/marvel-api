import { Request, Response } from 'express';

import CharacterController from 'controller/CharacterController';

const RedisService = require('service/RedisService').default;
const CharacterService = require('service/CharacterService').default;
const CharacterTransformer = require('transformer/CharacterTransformer')
  .default;

jest.mock('service/RedisService');
jest.mock('service/CharacterService');
jest.mock('transformer/CharacterTransformer');

describe('service/CharacterController', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    RedisService.getEtag.mockClear();
    RedisService.setEtag.mockClear();
    RedisService.setCachedData.mockClear();
    RedisService.getCachedData.mockClear();
    CharacterService.getAllCharacters.mockClear();
    CharacterService.getCharacter.mockClear();
    CharacterTransformer.transformCharacters.mockClear();
    CharacterTransformer.transformCharacter.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('#index()', () => {
    it('Should save to cache and return data if marvel api status is 200', async () => {
      const request = {
        method: 'GET',
      };

      const response = {};
      const next = jest.fn(() => ({}));

      CharacterService.getAllCharacters.mockImplementationOnce(() => ({
        statusCode: 200,
        body: {
          data: {
            results: [],
          },
        },
      }));

      await CharacterController.index(
        request as Request,
        response as Response,
        next,
      );

      expect(RedisService.getEtag).toHaveBeenCalledTimes(1);
      expect(RedisService.setEtag).toHaveBeenCalledTimes(1);
      expect(RedisService.setCachedData).toHaveBeenCalledTimes(1);
      expect(CharacterTransformer.transformCharacters).toHaveBeenCalledTimes(1);

      // If marvel api returns 200 we dont expect to get data from cache
      expect(RedisService.getCachedData).toHaveBeenCalledTimes(0);
    });

    it('Should read from cache and return data if marvel api status is 304', async () => {
      const request = {
        method: 'GET',
      };

      const response = {};
      const next = jest.fn(() => ({}));

      CharacterService.getAllCharacters.mockImplementationOnce(() => ({
        statusCode: 304,
        body: {
          data: {
            results: [],
          },
        },
      }));

      await CharacterController.index(
        request as Request,
        response as Response,
        next,
      );

      expect(RedisService.getEtag).toHaveBeenCalledTimes(1);
      expect(RedisService.getCachedData).toHaveBeenCalledTimes(1);
      expect(CharacterTransformer.transformCharacters).toHaveBeenCalledTimes(1);

      // If marvel api returns 304 we dont expect to cache data
      expect(RedisService.setEtag).toHaveBeenCalledTimes(0);
      expect(RedisService.setCachedData).toHaveBeenCalledTimes(0);
    });

    it('Should resolve with an error if unhandled marvel api status', async () => {
      const request = {
        method: 'GET',
      };

      const response = {};
      const next = jest.fn(() => ({}));

      CharacterService.getAllCharacters.mockImplementationOnce(() => ({
        statusCode: 400,
        body: {
          data: {
            results: [],
          },
        },
      }));

      await expect(
        CharacterController.index(
          request as Request,
          response as Response,
          next,
        ),
      ).resolves.toMatchSnapshot();
    });
  });
});
