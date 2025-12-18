import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  password: String,
  pokemons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "OwnedPokemon"
  }]
});

export default mongoose.model("Trainer", TrainerSchema);