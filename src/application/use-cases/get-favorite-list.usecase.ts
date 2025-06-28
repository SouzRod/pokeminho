import { PokemonRepository } from 'src/domain/repositories';

export class GetFavoriteListUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  async execute() {
    return this.repository.findAll();
  }
}
