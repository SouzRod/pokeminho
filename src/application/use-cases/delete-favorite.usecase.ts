import { PokemonRepository } from "src/domain/repositories";

export class DeleteFavoriteUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  async execute(id: string) {
    return this.repository.deleteById(Number(id));
  }
}
