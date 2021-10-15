import express from 'express';
import mongoose from 'mongoose';
// import dotenv from "dotenv";
//Apollo Server
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
//graphql schema
import resolvers from './graphql/resolvers.js';
import typeDefs from './graphql/typedefs.js';
import dbConnection from "./db/connection/index.js";
// dotenv.config();
async function startServer() {
  const app = express()
  const httpServer = http.createServer(app)
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  // Connect to MongoDB
  await dbConnection()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
  // try {
  //   await mongoose.connect(process.env.MONGODB_URL, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   })
  //   console.log('Connected to MongoDB')
  // } catch (error) {
  //   console.log(error)
  // } 
  
  const PORT = process.env.PORT || 4000;
  await new Promise(resolve => httpServer.listen(PORT, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
}


startServer();

