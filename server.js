const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const http = require("http");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/use/ws");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const matches = require("./data/matches");
const { pubsub, SCORE_UPDATED } = require("./pubsub/pubsub");

async function startServer() {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  const app = express();

  const server = new ApolloServer({
    schema
  });

  await server.start();

  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql"
  });

  useServer({ schema }, wsServer);

  const matchIds = matches.map(m => m.id);
  
  setInterval(() => {
    const randomMatchId = matchIds[Math.floor(Math.random() * matchIds.length)];
    const match = matches.find(m => m.id === randomMatchId);
    
    if (match) {
      const [scoreA, scoreB] = match.score.split('-').map(Number);
      const randomTeam = Math.random() > 0.5 ? 'A' : 'B';
      
      if (randomTeam === 'A') {
        match.score = `${scoreA + 1}-${scoreB}`;
      } else {
        match.score = `${scoreA}-${scoreB + 1}`;
      }
      
      pubsub.publish(`${SCORE_UPDATED}:${randomMatchId}`, {
        scoreUpdated: match
      });
      
      console.log(`⚽ Goal! Match ${randomMatchId}: ${match.teamA} vs ${match.teamB} - ${match.score}`);
    }
  }, 8000);

  httpServer.listen(4000, () => {
    console.log("✅ Server running at http://localhost:4000/graphql");
    console.log("🔌 WebSocket subscriptions available at ws://localhost:4000/graphql");
    console.log("⚽ Auto-simulation enabled: Goals every 8 seconds");
  });
}

startServer();