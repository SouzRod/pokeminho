import { Pokemon } from './pokemon.entity';

export class PokemonMapper {
  static fromPokeApi(apiData: any): Pokemon {
    return new Pokemon({
      id: apiData.id,
      name: apiData.name,
      types: apiData.types ? apiData.types.map(({ type }) => type.name) : [],
      weight: apiData.weight ?? 0,
    });
  }
}
