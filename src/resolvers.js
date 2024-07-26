const resolvers = {
  Query: {
    tasks: (_, __, { tasks }) => tasks,
  },
  Mutation: {
    createTask: (_, { title, description }, { tasks, idCounter }) => {
      const newTask = { id: idCounter++, title, description, completed: false };
      tasks.push(newTask);

      return newTask;
    },
    updateTask: (_, { id, title, description, completed }, { tasks }) => {
      const task = tasks.find((task) => task.id === parseInt(id));

      if (!task) return null;
      if (title !== undefined) task.title = title;
      if (completed !== undefined) task.completed = completed;
      task.description = description;

      return task;
    },
    deleteTask: (_, { id }, { tasks }) => {
      const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

      if (taskIndex === -1) return null;

      const [deletedTask] = tasks.splice(taskIndex, 1);
      return deletedTask;
    },
  },
};

module.exports = resolvers;
