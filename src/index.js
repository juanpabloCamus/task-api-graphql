const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema.js");
const resolvers = require("./resolvers.js");

let tasks = [];
let idCounter = 1;
const updateCounter = () => idCounter++;

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ tasks, updateCounter }),
});

server.start().then(() => {
  server.applyMiddleware({ app });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}${server.graphqlPath}`,
  );
});
