import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_MATCH, UPDATE_SCORE, SCORE_UPDATED } from './queries';
import './MatchCard.css';

const MatchCard = ({ matchId }) => {
  const [updateScore, { loading: updateLoading }] = useMutation(UPDATE_SCORE);
  const [newScore, setNewScore] = useState('');
  const [scoreUpdatedNotification, setScoreUpdatedNotification] = useState(false);
  const [lastScore, setLastScore] = useState('');

  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(GET_MATCH, {
    variables: { id: matchId },
  });

  const { data: subscriptionData } = useSubscription(SCORE_UPDATED, {
    variables: { matchId },
  });

  const matchData = subscriptionData?.scoreUpdated || queryData?.match;

  useEffect(() => {
    if (matchData?.score && matchData.score !== lastScore) {
      setScoreUpdatedNotification(true);
      setLastScore(matchData.score);
      setTimeout(() => setScoreUpdatedNotification(false), 1000);
    }
  }, [matchData?.score, lastScore]);

  const handleUpdateScore = async () => {
    if (!newScore.trim()) {
      alert('Please enter a score');
      return;
    }
    try {
      await updateScore({
        variables: {
          matchId,
          score: newScore,
        },
      });
      setNewScore('');
    } catch (err) {
      console.error('Error updating score:', err);
    }
  };

  const handleQuickScore = (score) => {
    setNewScore(score);
  };

  if (queryLoading) {
    return (
      <div className="match-card loading">
        <div className="loading-spinner"></div>
        <p>Loading match data...</p>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="match-card">
        <div className="error-message">
          ❌ Error: {queryError.message}
        </div>
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="match-card">
        <div className="error-message">
          ❌ Match not found
        </div>
      </div>
    );
  }

  const [scoreA, scoreB] = matchData.score.split('-').map(Number);

  return (
    <div className="match-card">
      <div className="match-header">
        <div className={`status-badge ${matchData.status === 'FINISHED' ? 'finished' : ''}`}>
          {matchData.status === 'LIVE' ? '🔴 LIVE' : matchData.status}
        </div>
        <h1 style={{ fontSize: '24px', color: '#333', marginTop: '10px' }}>
          {matchData.teamA} vs {matchData.teamB}
        </h1>
      </div>

      <div className="teams-container">
        <div className="team">
          <div className="team-name">{matchData.teamA}</div>
          <div className={`team-score ${scoreUpdatedNotification ? 'updated' : ''}`}>
            {scoreA}
          </div>
        </div>

        <div className="vs-text">VS</div>

        <div className="team">
          <div className="team-name">{matchData.teamB}</div>
          <div className={`team-score ${scoreUpdatedNotification ? 'updated' : ''}`}>
            {scoreB}
          </div>
        </div>
      </div>

      {matchData.markets && matchData.markets.length > 0 && (
        <div className="markets-section">
          <div className="markets-title">💰 Available Markets</div>
          {matchData.markets.map((market, index) => (
            <div key={index} className="market-item">
              <span className="market-name">{market.name}</span>
              <span className="market-odds">{market.odds}</span>
            </div>
          ))}
        </div>
      )}

      <div className="controls-section">
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#666', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Update Score
          </label>
          <div className="score-update-form">
            <input
              type="text"
              className="score-input"
              placeholder="e.g., 2-1"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              disabled={updateLoading}
            />
            <button
              className="update-btn"
              onClick={handleUpdateScore}
              disabled={updateLoading}
            >
              {updateLoading ? '⏳ Updating...' : '🔄 Update'}
            </button>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', color: '#999', marginBottom: '10px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>
            Quick Updates
          </div>
          <div className="suggestion-buttons">
            <button className="quick-btn" onClick={() => handleQuickScore('1-0')}>1-0</button>
            <button className="quick-btn" onClick={() => handleQuickScore('1-1')}>1-1</button>
            <button className="quick-btn" onClick={() => handleQuickScore('2-0')}>2-0</button>
            <button className="quick-btn" onClick={() => handleQuickScore('2-1')}>2-1</button>
            <button className="quick-btn" onClick={() => handleQuickScore('2-2')}>2-2</button>
            <button className="quick-btn" onClick={() => handleQuickScore('3-0')}>3-0</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MatchCard;
