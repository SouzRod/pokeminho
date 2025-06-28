import { Pokemon } from "src/domain/entities";
import { PokemonApiRepository, PokemonRepository } from "src/domain/repositories";


export class AddFavoritePokemonUseCase {
  constructor(
    private readonly repository: PokemonRepository,
    private readonly apiRepository: PokemonApiRepository
  ) {}

  async execute(id: string) {
    const existingPokemon = await this.repository.findById(Number(id));
    if (existingPokemon) {
      return new Pokemon(existingPokemon);
    }
    const pokemon = await this.apiRepository.findById(Number(id));
    if (!pokemon) {
      throw new Error('Pokemon not found');
    }
    const createdPokemon = await this.repository.create(pokemon);
    return new Pokemon(createdPokemon);
  }
}
