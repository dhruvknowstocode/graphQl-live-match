const matches = require("../data/matches");
const { pubsub, SCORE_UPDATED } = require("../pubsub/pubsub");

const resolvers = {
  Query: {
    matches: () => matches,
    match: (_, { id }) => {
      return matches.find(m => m.id === id);
    }
  },
  Mutation: {
    updateScore: (_, { matchId, score }) => {
      const match = matches.find(m => m.id === matchId);
      if (!match) throw new Error("Match not found");
      match.score = score;
      pubsub.publish(`${SCORE_UPDATED}:${matchId}`, {
        scoreUpdated: match
      });
      return match;
    }
  },
  Subscription: {
    scoreUpdated: {
      subscribe: (_, { matchId }) => {
        return pubsub.asyncIterator([`${SCORE_UPDATED}:${matchId}`]);
      }
    }
  }
};

module.exports = resolvers;