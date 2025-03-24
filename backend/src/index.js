import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { auth } from './middleware/auth.js';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/api_bi_developer';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Apollo Server Setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
    models: {
      Project: mongoose.model('Project'),
      Service: mongoose.model('Service'),
      Skill: mongoose.model('Skill'),
      Contact: mongoose.model('Contact'),
      CV: mongoose.model('CV')
    }
  })
});

// Apply auth middleware to /graphql route
app.use('/graphql', auth.middleware);

// Start Server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

startServer(); 