import { CacheRepository, PokemonApiRepository } from 'src/domain/repositories';
import { Pokemon } from 'src/domain/entities';

export class GetPokemonListUseCase {
  constructor(
    private readonly repository: PokemonApiRepository,
    private readonly cache: CacheRepository,
  ) { }

  async execute(offset: string, limit: string): Promise<Pokemon[]> {
    const cacheKey = `pokemon_list_${offset}_${limit}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const pokemons = await this.repository.findAll(offset, limit);

    await this.cache.set(cacheKey, JSON.stringify(pokemons), 3600);

    return pokemons;
  }
}
