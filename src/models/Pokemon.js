import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
  name: String,
  description: String,
  height: Number,
  weight: Number,
  types: [String]
});

export default mongoose.model("Pokemon", PokemonSchema);