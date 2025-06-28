import { Pokemon } from '../entities/pokemon.entity';

export interface PokemonApiRepository {
  findAll(offset: string, limit: string): Promise<Pokemon[]>;
  findById(id: number): Promise<Pokemon | null>;
}
