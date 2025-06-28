import { Schema } from 'mongoose';

export const PokemonSchema = new Schema({
  id: Number,
  name: String,
  types: [String],
  weight: Number,
});
