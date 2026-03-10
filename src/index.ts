import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import { context } from "./context";

dotenv.config();

const startServer = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });

  const { url } = await server.listen();

  console.log("Servidor listo en", url);
};

startServer();
