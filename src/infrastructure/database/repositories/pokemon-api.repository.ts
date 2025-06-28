import { PokemonApiRepository as IPokemonApiRepository } from 'src/domain/repositories/pokemon-api.repository';
import { PokeApiListItemDTO } from 'src/application/dto/pokeapi-list-item.dto';
import { PokeApiService } from 'src/infrastructure/external/pokeapi.service';
import { Pokemon, PokemonMapper } from 'src/domain/entities';

export class PokemonApiRepository implements IPokemonApiRepository {
  constructor(private readonly pokeApiService: PokeApiService) { }

  async findAll(offset: string, limit: string): Promise<Pokemon[]> {
    const data = await this.pokeApiService.getPokemonList(offset, limit);
    return Promise.all(data.results.map(async (item: PokeApiListItemDTO) => {
      const pokemonData = await this.pokeApiService.getPokemonByUrl(item.url);
      return PokemonMapper.fromPokeApi(pokemonData);
    }));
  }

  async findById(id: number): Promise<Pokemon | null> {
    const pokemonData = await this.pokeApiService.getPokemonById(id);
    return pokemonData ? PokemonMapper.fromPokeApi(pokemonData) : null;
  }
}
