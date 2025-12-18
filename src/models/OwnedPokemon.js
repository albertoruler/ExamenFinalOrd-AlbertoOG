import mongoose from "mongoose";

const OwnedPokemonSchema = new mongoose.Schema({
  pokemon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pokemon"
  },
  nickname: String,
  attack: Number,
  defense: Number,
  speed: Number,
  special: Number,
  level: Number
});

export default mongoose.model("OwnedPokemon", OwnedPokemonSchema);