import React from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client } from './apolloClient';
import MatchCard from './MatchCard';
import { GET_MATCHES } from './queries';
import './App.css';

function MatchesGrid() {
  const { loading, error, data } = useQuery(GET_MATCHES);

  if (loading) {
    return (
      <div className="matches-grid">
        <div className="loading">Loading matches...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="matches-grid">
        <div className="error">Error loading matches: {error.message}</div>
      </div>
    );
  }

  const matches = data?.matches || [];

  return (
    <div className="matches-grid">
      {matches.length === 0 ? (
        <div className="no-matches">No matches available</div>
      ) : (
        matches.map(match => (
          <MatchCard key={match.id} matchId={match.id} />
        ))
      )}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <div className="header">
          <h1>⚽ Live Match Updates</h1>
          <p>Real-time Score Updates via GraphQL Subscriptions</p>
        </div>

        <MatchesGrid />

        <div className="footer">
          <p>🚀 Built with React + Apollo Client + GraphQL Subscriptions</p>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;