require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const { createStore } = require('./utils');


const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');


const store = createStore();

const server = new ApolloServer({
  typeDefs,

  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
});

server.listen().then(() => {
  console.log(`
    🚀 Server ready!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});
