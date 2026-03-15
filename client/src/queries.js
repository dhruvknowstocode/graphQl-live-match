import { gql } from '@apollo/client';

export const GET_MATCHES = gql`
  query GetMatches {
    matches {
      id
      teamA
      teamB
      score
      status
      markets {
        name
        odds
      }
    }
  }
`;

export const GET_MATCH = gql`
  query GetMatch($id: ID!) {
    match(id: $id) {
      id
      teamA
      teamB
      score
      status
      markets {
        name
        odds
      }
    }
  }
`;

export const UPDATE_SCORE = gql`
  mutation UpdateScore($matchId: ID!, $score: String!) {
    updateScore(matchId: $matchId, score: $score) {
      id
      teamA
      teamB
      score
      status
    }
  }
`;

export const SCORE_UPDATED = gql`
  subscription ScoreUpdated($matchId: ID!) {
    scoreUpdated(matchId: $matchId) {
      id
      teamA
      teamB
      score
      status
      markets {
        name
        odds
      }
    }
  }
`;
