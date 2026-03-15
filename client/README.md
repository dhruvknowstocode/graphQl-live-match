# GraphQL Live Match Client

Beautiful React frontend for real-time sports match updates using GraphQL subscriptions.

## Features

✅ **Real-time Score Updates** - Subscribe to live score changes via WebSocket  
✅ **Apollo Client Integration** - Handles queries, mutations, and subscriptions  
✅ **Beautiful UI** - Modern, responsive design with animations  
✅ **Quick Update Buttons** - Easily update scores with preset values  
✅ **Live Status Indicator** - Shows when match is live or finished  
✅ **Market/Odds Display** - Shows available betting markets  
✅ **Error Handling** - User-friendly error messages  

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at http://localhost:3000

## How It Works

1. **Apollo Client Setup**
   - Connects to GraphQL server at `http://localhost:4000/graphql`
   - Uses WebSocket for subscriptions at `ws://localhost:4000/graphql`
   - Automatically routes subscriptions via WebSocket, queries/mutations via HTTP

2. **Real-Time Updates**
   - Component subscribes to score changes
   - When server publishes update, client receives it instantly via WebSocket
   - Score animates when it changes
   - No need to refresh page!

3. **Update Scores**
   - Use input field or quick buttons
   - Mutation is sent to server
   - Server publishes event to all subscribers
   - All connected clients see update instantly

## Usage

### Run Backend First
```bash
cd ..
npm start
# Server runs at http://localhost:4000/graphql
```

### Run Frontend
```bash
npm start
# Frontend runs at http://localhost:3000
```

### Test Real-Time Updates

1. Open http://localhost:3000 in browser
2. Open same URL in another tab or device
3. Click "Update" button or "Quick Updates" in one tab
4. **Both tabs update instantly!** ⚡

## File Structure

```
client/
├── src/
│   ├── App.js                 # Main app component
│   ├── App.css                # App styling
│   ├── MatchCard.js           # Match display component
│   ├── MatchCard.css          # Match card styling
│   ├── apolloClient.js        # Apollo Client config
│   ├── queries.js             # GraphQL queries/mutations/subscriptions
│   ├── index.js               # React entry point
│   └── index.css              # Global styles
├── public/
│   └── index.html             # HTML template
├── package.json               # Dependencies
└── README.md                  # This file
```

## GraphQL Operations

### Query Matches
```graphql
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
```

### Update Score
```graphql
mutation UpdateScore($matchId: ID!, $score: String!) {
  updateScore(matchId: $matchId, score: $score) {
    id
    score
  }
}
```

### Subscribe to Updates
```graphql
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
```

## Features Breakdown

### 1. Real-Time Subscriptions
- Component uses `useSubscription` hook
- Subscribes to `SCORE_UPDATED` event
- Automatically reconnects if connection drops
- Data flows instantly to UI

### 2. Score Update Animation
- When score changes, animation plays
- Score pulses and scales up briefly
- Visual feedback for users

### 3. Quick Update Buttons
- Pre-filled common scores (1-0, 2-1, etc.)
- No need to manually type scores
- Great for demos and testing

### 4. Markets Display
- Shows available betting markets
- Displays current odds
- Real data from backend

### 5. Status Indicator
- Live status shows "🔴 LIVE"
- Finished matches show "FINISHED"
- Pulsing animation for live matches

## Styling

Built with:
- **CSS Grid** for responsive layouts
- **Flexbox** for component alignment
- **Gradient backgrounds** for modern look
- **Animations** for smooth transitions
- **Mobile-first** responsive design

## Error Handling

- Connection errors display error message
- Failed mutations show error feedback
- Loading states for async operations
- User-friendly error messages

## Performance Optimization

- Apollo Client caches data
- Subscriptions only update when data changes
- Efficient component re-rendering
- Lazy loading of match data

## Future Enhancements

- Multiple matches display
- Match filtering and search
- Notification system
- Dark mode toggle
- Match history
- Real-time odds updates
- Player statistics
- Live commentary feed

---

Built with ❤️ for real-time sports fans 🚀
