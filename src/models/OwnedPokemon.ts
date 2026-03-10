import mongoose, { Schema, Document } from "mongoose";

export interface IOwnedPokemon extends Document {
  pokemon: mongoose.Types.ObjectId;
  nickname?: string;
  attack: number;
  defense: number;
  speed: number;
  special: number;
  level: number;
}

const OwnedPokemonSchema = new Schema<IOwnedPokemon>({
  pokemon: {
    type: Schema.Types.ObjectId,
    ref: "Pokemon"
  },
  nickname: String,
  attack: Number,
  defense: Number,
  speed: Number,
  special: Number,
  level: Number
});

export default mongoose.model<IOwnedPokemon>(
  "OwnedPokemon",
  OwnedPokemonSchema
);
