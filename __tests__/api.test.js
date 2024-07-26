const request = require("supertest");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("../src/schema");
const resolvers = require("../src/resolvers");

let server, app;
let tasks = [];
let idCounter = 1;

beforeAll(() => {
  app = express();
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ tasks, idCounter }),
  });

  server.start().then(() => {
    server.applyMiddleware({ app });
  });
});

beforeEach(() => {
  tasks = [];
  idCounter = 1;
});

test("should create a task", async () => {
  const response = await request(app)
    .post("/graphql")
    .send({
      query: `
        mutation {
          createTask(title: "Test Task", description: "Test Description") {
            id
            title
            description
            completed
          }
        }
      `,
    });
  expect(response.body.data.createTask.title).toBe("Test Task");
  expect(response.body.data.createTask.description).toBe("Test Description");
  expect(response.body.data.createTask.completed).toBe(false);
});

test("should get all tasks", async () => {
  await request(app)
    .post("/graphql")
    .send({
      query: `
        mutation {
          createTask(title: "Task 1", description: "Description 1") {
            id
          }
        }
      `,
    });

  const response = await request(app)
    .post("/graphql")
    .send({
      query: `
        {
          tasks {
            id
            title
            description
            completed
          }
        }
      `,
    });

  expect(response.body.data.tasks.length).toBe(1);
  expect(response.body.data.tasks[0].title).toBe("Task 1");
});

test("should update a task", async () => {
  const createResponse = await request(app)
    .post("/graphql")
    .send({
      query: `
        mutation {
          createTask(title: "Task to Update", description: "Old Description") {
            id
          }
        }
      `,
    });

  const taskId = createResponse.body.data.createTask.id;

  const updateResponse = await request(app)
    .post("/graphql")
    .send({
      query: `
        mutation {
          updateTask(id: ${taskId}, title: "Updated Task", description: "Updated Description", completed: true) {
            id
            title
            description
            completed
          }
        }
      `,
    });

  expect(updateResponse.body.data.updateTask.title).toBe("Updated Task");
  expect(updateResponse.body.data.updateTask.description).toBe(
    "Updated Description",
  );
  expect(updateResponse.body.data.updateTask.completed).toBe(true);
});

test("should delete a task", async () => {
  const createResponse = await request(app)
    .post("/graphql")
    .send({
      query: `
        mutation {
          createTask(title: "Task to Delete", description: "Delete Description") {
            id
          }
        }
      `,
    });

  const taskId = createResponse.body.data.createTask.id;

  const deleteResponse = await request(app)
    .post("/graphql")
    .send({
      query: `
        mutation {
          deleteTask(id: ${taskId}) {
            id
          }
        }
      `,
    });

  expect(deleteResponse.body.data.deleteTask.id).toBe(taskId);

  const getResponse = await request(app)
    .post("/graphql")
    .send({
      query: `
      {
        tasks {
          id
        }
      }
    `,
    });

  expect(getResponse.body.data.tasks.length).toBe(0);
});
