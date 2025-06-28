import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Pokemon, PokemonMapper } from 'src/domain/entities';
import { PokemonRepository } from 'src/domain/repositories';

@Injectable()
export class PokemonMongoRepository implements PokemonRepository {
  constructor(
    @InjectModel('Pokemon')
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async findAll(): Promise<Pokemon[]> {
    const pokemons = await this.pokemonModel.find().exec();
    return pokemons.map(pokemon => {
      return new Pokemon(pokemon);
    });
  }

  async findById(id: number): Promise<Pokemon | null> {
    const pokemon = await this.pokemonModel.findOne({ id }).exec();
    return pokemon ? new Pokemon(pokemon) : null;
  }

  async create(pokemon: Pokemon): Promise<Pokemon> {
    return this.pokemonModel.create(pokemon);
  }

  async deleteById(id: number): Promise<void> {
    await this.pokemonModel.deleteOne({ id }).exec();
  }
}
