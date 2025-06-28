import { Pokemon } from '../entities/pokemon.entity';

export interface PokemonRepository {
  findAll(): Promise<Pokemon[]>;
  findById(id: number): Promise<Pokemon | null>;
  create(pokemon: Pokemon): Promise<Pokemon>;
  deleteById(id: number): Promise<void>;
}
