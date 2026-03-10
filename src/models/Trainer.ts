import mongoose, { Schema, Document } from "mongoose";

export interface ITrainer extends Document {
  name: string;
  password: string;
  pokemons: mongoose.Types.ObjectId[];
}

const TrainerSchema = new Schema<ITrainer>({
  name: { type: String, unique: true },
  password: String,
  pokemons: [
    {
      type: Schema.Types.ObjectId,
      ref: "OwnedPokemon"
    }
  ]
});

export default mongoose.model<ITrainer>("Trainer", TrainerSchema);
