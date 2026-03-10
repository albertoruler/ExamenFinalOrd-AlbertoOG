import mongoose, { Schema, Document } from "mongoose";

export interface IPokemon extends Document {
  name: string;
  description: string;
  height: number;
  weight: number;
  types: string[];
}

const PokemonSchema = new Schema<IPokemon>({
  name: String,
  description: String,
  height: Number,
  weight: Number,
  types: [String]
});

export default mongoose.model<IPokemon>("Pokemon", PokemonSchema);
