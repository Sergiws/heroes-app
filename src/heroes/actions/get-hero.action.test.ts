import { describe, expect, test } from 'vitest';
import { getHeroAction } from './get-hero.action';

describe('getHeroAction', () => {
  test('should fetch hero data and return with complete image url', async () => {
    const hero = await getHeroAction('clark-kent');

    expect(hero).toBeDefined();
    expect(typeof hero.alias).toBe('string');
    expect(typeof hero.category).toBe('string');
    expect(typeof hero.description).toBe('string');
    expect(typeof hero.durability).toBe('number');
    expect(typeof hero.firstAppearance).toBe('string');
    expect(typeof hero.id).toBe('string');
    expect(hero.image).toBeDefined();
    expect(hero.image).toContain('http');
    expect(typeof hero.image).toBe('string');
    expect(typeof hero.intelligence).toBe('number');
    expect(typeof hero.name).toBe('string');
    expect(hero.powers).toBeDefined();
    expect(typeof hero.slug).toBe('string');
    expect(typeof hero.speed).toBe('number');
    expect(typeof hero.status).toBe('string');
    expect(typeof hero.strength).toBe('number');
    expect(typeof hero.team).toBe('string');
    expect(typeof hero.universe).toBe('string');
  });

  test('should throw an error if hero is not found', async () => {
    const result = await getHeroAction('asdfkljhasdfñlkjasdf').catch(
      (error) => {
        expect(error).toBeDefined();
        expect(error.message).toBe('Request failed with status code 404');
      },
    );

    expect(result).toBeUndefined();
  });
});
