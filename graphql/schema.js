const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Market {
    name: String
    odds: Float
  }

  type Match {
    id: ID
    teamA: String
    teamB: String
    score: String
    status: String
    markets: [Market]
  }

  type Query {
    matches: [Match]
    match(id: ID!): Match
  }

  type Mutation {
    updateScore(matchId: ID!, score: String!): Match
  }

  type Subscription {
    scoreUpdated(matchId: ID!): Match
  }
`;

module.exports = typeDefs;