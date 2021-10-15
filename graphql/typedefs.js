import {gql} from 'apollo-server-express';

const typeDefs = gql`
  
  type Task {
    id: ID!
    description: String!
    status: EnumTaskStatus!
  }
  
  input TaskInput {
    description: String!
    status: EnumTaskStatus!
  }
  
  enum EnumTaskStatus {
    ACTIVE
    COMPLETE
  }

  type Query {
    getAllTasks: [Task]
    getTask(id:ID):Task
  }
  type Mutation {
    createTask(input: TaskInput!): Task
    updateTask(id: ID!, input: TaskInput): Task
    deleteTask(id: ID!): String
    
  }
`;

export default typeDefs;