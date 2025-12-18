import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import { context } from "./context.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

server.listen().then(({ url }) => {
  console.log("Servidor listo en", url);
});