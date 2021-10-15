//Task Model
import Task from '../db/models/Task.js';

const resolvers = {
  Query: {
    getAllTasks: async () => {
      const tasks = await Task.find()
      return tasks
    },
    getTask: async (_, { id }) => {
      const task = await Task.findById(id)
      return task
    }
  },
  Mutation: {
    createTask: async (parent, { input }) => {
      const newTask = new Task(input)
      await newTask.save()
      return newTask
    },
    updateTask: async (parent, { id, input }) => {
      const task = await Task.findByIdAndUpdate(id, input, { new: true })
      return task
    },
    deleteTask: async (parent, { id }) => {
      const task = await Task.findByIdAndDelete(id)
      return "Task deleted"
    }
  }
};

export default resolvers;