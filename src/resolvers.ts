import bcrypt from "bcryptjs";
import Trainer from "./models/Trainer";
import Pokemon from "./models/Pokemon";
import OwnedPokemon from "./models/OwnedPokemon";
import { createToken } from "./auth/jwt";

const resolvers = {
  Query: {
    me: async (_: any, __: any, { user }: any) => {
      if (!user) return null;

      return await Trainer.findById(user._id).populate({
        path: "pokemons",
        populate: { path: "pokemon" }
      });
    },

    pokemons: async (_: any, { page = 1, size = 10 }: any) => {
      const skip = (page - 1) * size;
      return await Pokemon.find().skip(skip).limit(size);
    },

    pokemon: async (_: any, { id }: any) => {
      return await Pokemon.findById(id);
    }
  },

  Mutation: {
    startJourney: async (_: any, { name, password }: any) => {
      const exists = await Trainer.findOne({ name });

      if (exists) {
        throw new Error("El entrenador ya existe");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const trainer = await Trainer.create({
        name,
        password: hashedPassword,
        pokemons: []
      });

      return createToken(trainer);
    },

    login: async (_: any, { name, password }: any) => {
      const trainer = await Trainer.findOne({ name });

      if (!trainer) {
        throw new Error("Credenciales incorrectas");
      }

      const valid = await bcrypt.compare(password, trainer.password);

      if (!valid) {
        throw new Error("Credenciales incorrectas");
      }

      return createToken(trainer);
    },

    createPokemon: async (_: any, args: any, { user }: any) => {
      if (!user) {
        throw new Error("No autenticado");
      }

      return await Pokemon.create(args);
    },

    catchPokemon: async (_: any, { pokemonId, nickname }: any, { user }: any) => {
      if (!user) {
        throw new Error("No autenticado");
      }

      const trainer = await Trainer.findById(user._id);

      if (trainer!.pokemons.length >= 6) {
        throw new Error("Un entrenador no puede tener más de 6 Pokémon");
      }

      const pokemon = await Pokemon.findById(pokemonId);

      if (!pokemon) {
        throw new Error("Pokémon no existe");
      }

      const ownedPokemon = await OwnedPokemon.create({
        pokemon: pokemon._id,
        nickname,
        attack: Math.floor(Math.random() * 100) + 1,
        defense: Math.floor(Math.random() * 100) + 1,
        speed: Math.floor(Math.random() * 100) + 1,
        special: Math.floor(Math.random() * 100) + 1,
        level: Math.floor(Math.random() * 100) + 1
      });

      trainer!.pokemons.push(ownedPokemon._id);

      await trainer!.save();

      return await ownedPokemon.populate("pokemon");
    },

    freePokemon: async (_: any, { ownedPokemonId }: any, { user }: any) => {
      if (!user) {
        throw new Error("No autenticado");
      }

      const trainer = await Trainer.findById(user._id);

      if (!trainer!.pokemons.includes(ownedPokemonId)) {
        throw new Error("Este Pokémon no te pertenece");
      }

      trainer!.pokemons = trainer!.pokemons.filter(
        (id) => id.toString() !== ownedPokemonId
      );

      await OwnedPokemon.findByIdAndDelete(ownedPokemonId);

      await trainer!.save();

      return await Trainer.findById(trainer!._id).populate({
        path: "pokemons",
        populate: { path: "pokemon" }
      });
    }
  }
};

export default resolvers;
