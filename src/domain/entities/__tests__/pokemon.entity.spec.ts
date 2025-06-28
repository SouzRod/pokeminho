import { Pokemon } from '../pokemon.entity';

describe('Pokemon Entity', () => {
  it('should create a Pokemon with default values', () => {
    const pokemon = new Pokemon({});
    expect(pokemon.id).toBe(0);
    expect(pokemon.name).toBe('');
    expect(pokemon.types).toEqual([]);
    expect(pokemon.weight).toBe(0);
  });

  it('should create a Pokemon with provided values', () => {
    const pokemon = new Pokemon({
      id: 25,
      name: 'pikachu',
      types: ['electric'],
      weight: 60,
    });
    expect(pokemon.id).toBe(25);
    expect(pokemon.name).toBe('pikachu');
    expect(pokemon.types).toEqual(['electric']);
    expect(pokemon.weight).toBe(60);
  });
});
