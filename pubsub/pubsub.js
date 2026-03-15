const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();
const SCORE_UPDATED = "SCORE_UPDATED";

module.exports = {
  pubsub,
  SCORE_UPDATED
};