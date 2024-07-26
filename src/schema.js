const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
  }

  type Query {
    tasks: [Task]
  }

  type Mutation {
    createTask(title: String!, description: String): Task
    updateTask(
      id: ID!
      title: String!
      description: String
      completed: Boolean
    ): Task
    deleteTask(id: ID!): Task
  }
`;

module.exports = typeDefs;
