import { PokemonMapper } from '../pokemon.mapper';

describe('PokemonMapper', () => {
  it('should map API data to Pokemon entity', () => {
    const apiData = {
      id: 1,
      name: 'bulbasaur',
      types: [
        { type: { name: 'grass' } },
        { type: { name: 'poison' } },
      ],
      weight: 69,
    };
    const pokemon = PokemonMapper.fromPokeApi(apiData);
    expect(pokemon.id).toBe(1);
    expect(pokemon.name).toBe('bulbasaur');
    expect(pokemon.types).toEqual(['grass', 'poison']);
    expect(pokemon.weight).toBe(69);
  });

  it('should handle missing types and weight', () => {
    const apiData = { id: 2, name: 'ivysaur' };
    const pokemon = PokemonMapper.fromPokeApi(apiData);
    expect(pokemon.types).toEqual([]);
    expect(pokemon.weight).toBe(0);
  });
});
