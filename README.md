# 📚 GraphQL Live Match Updates - Complete Project Documentation

## 🎯 Quick Start

```bash
# Terminal 1: Start GraphQL Backend
npm start  # or: node server.js

# Terminal 2: Start React Frontend
cd client
npm install  # First time only
npm start
```

**Result:** 
- Backend: http://localhost:4000/graphql
- Frontend: http://localhost:3000

Open the frontend and update match scores to observe real-time updates across multiple clients.

---

## 📁 Project Structure

```
graphql-liveMatch/
├──  Backend (GraphQL Server)
│   ├── server.js                       ← Main entry point
│   ├── package.json
│   ├── graphql/
│   │   ├── schema.js                   ← Type definitions
│   │   └── resolvers.js                ← Business logic
│   ├── data/
│   │   └── matches.js                  ← Sample data
│   └── pubsub/
│       └── pubsub.js                   ← Event system
│
└──  Frontend (React App)
    ├── client/
    │   ├── src/
    │   │   ├── App.js                  ← Main component
    │   │   ├── App.css                 ← App styles
    │   │   ├── MatchCard.js            ← Match display
    │   │   ├── MatchCard.css           ← Card styles
    │   │   ├── apolloClient.js         ← Apollo setup
    │   │   ├── queries.js              ← GraphQL ops
    │   │   ├── index.js                ← React entry
    │   │   └── index.css               ← Global styles
    │   ├── public/
    │   │   └── index.html
    │   ├── package.json
    │   └── README.md
```

---

## System Overview

A **real-time sports match updates system** demonstrating:

✅ **GraphQL Queries** - Fetch match data  
✅ **GraphQL Mutations** - Update scores  
✅ **GraphQL Subscriptions** - Real-time push updates  
✅ **WebSocket** - Persistent connections  
✅ **PubSub** - Event broadcasting  
✅ **Apollo Client** - Frontend integration  
✅ **React** - Beautiful UI with animations  

**Use Case:** Multiple users watching a live match, all seeing instant updates without refreshing.

---

##  Architecture

```
┌──────────────────────────────────────────────────────────┐
│                  Web Browser (Client)                    │
├──────────────────────────────────────────────────────────┤
│  React App + Apollo Client                              │
│  ├─ Displays match data                                 │
│  ├─ Sends mutations (update score)                      │
│  ├─ Subscribes to real-time updates                     │
│  └─ Updates UI instantly when data changes              │
└────┬──────────────────────────────────────────┬──────────┘
     │ HTTP (Queries & Mutations)  │ WebSocket (Subscriptions)
     │                             │
┌────▼─────────────────────────────▼──────────────────────┐
│         GraphQL Server (Node.js + Apollo)               │
├────────────────────────────────────────────────────────┤
│  Schema (Type definitions)                              │
│  ├─ Match type                                          │
│  ├─ Query (fetch data)                                 │
│  ├─ Mutation (update data)                             │
│  └─ Subscription (real-time updates)                   │
│                                                         │
│  Resolvers (Implementation)                             │
│  ├─ Query resolvers → fetch from data                  │
│  ├─ Mutation resolvers → update data + publish event   │
│  └─ Subscription resolvers → listen for events         │
│                                                         │
│  PubSub (Event System)                                 │
│  ├─ Publishes "SCORE_UPDATED:1" when score changes    │
│  └─ All subscribers receive instant notification      │
│                                                         │
│  Data Storage                                           │
│  └─ In-memory matches array                            │
└────────────────────────────────────────────────────────┘
```

---

##  Data Flow Example

**Scenario:** User A updates score, User B sees it instantly

```
┌─ User A (Browser Tab 1) ─────────────────────────────────┐
│  Clicks "Update Score" button                             │
│  Input: "2-1"                                            │
│  Sends MUTATION via HTTP to server                       │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
      ┌──────────────────────────┐
      │   GraphQL Server         │
      │  (Processes mutation)    │
      │  updateScore(1, "2-1")   │
      │  - Updates data          │
      │  - Publishes event       │
      │    "SCORE_UPDATED:1"     │
      └──────────┬───────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
    Tab 1            Tab 2 (User B)
  Receives        Via WebSocket
  HTTP            subscription
  response        Receives event
  Updates        Updates UI
                 Animates score

Result: Both tabs show "2-1" in sync! ⚡
```

---

##  Technologies Used

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 | UI framework |
| **API Client** | Apollo Client 3 | GraphQL client |
| **Backend** | Node.js + Express | Server runtime |
| **GraphQL Server** | Apollo Server 3 | GraphQL implementation |
| **Real-time** | graphql-ws | WebSocket protocol |
| **WebSocket** | ws | WebSocket library |
| **Events** | graphql-subscriptions | PubSub system |
| **Styling** | CSS3 | Modern animations |
| **Build** | react-scripts | Development tools |

---

##  Key Concepts

### GraphQL vs REST
```
REST API:
  Client: GET /api/match/1
  Response: All match data (over-fetching)
  Updates: Need to poll every N seconds ❌

GraphQL Subscriptions:
  Client: subscription { scoreUpdated(id: "1") { score } }
  Response: Only score field
  Updates: Pushed instantly via WebSocket ✅
```

### Query vs Mutation vs Subscription
```
Query:
  Purpose: Fetch data
  Request: HTTP POST
  Response: Once, connection closes
  Example: Get all matches

Mutation:
  Purpose: Modify data
  Request: HTTP POST
  Response: Once, connection closes
  Example: Update score, server publishes event

Subscription:
  Purpose: Real-time updates
  Request: WebSocket (persistent)
  Response: Multiple times
  Example: Listen for score changes
```

### PubSub Pattern
```
Publisher (Server):
  pubsub.publish("SCORE_UPDATED:1", { score: "2-1" })
  └─ Broadcasts event to channel

Subscribers (Clients):
  pubsub.asyncIterator(["SCORE_UPDATED:1"])
  └─ Listen to channel, receive updates instantly
```

---

##  How Real-Time Updates Work

1. **Client subscribes** → Opens WebSocket → Registers interest in event
2. **Another client mutates** → Server processes mutation → Server publishes event
3. **PubSub broadcasts** → All subscribed clients receive data
4. **Client receives** → Update UI → Users see change instantly

**The update is delivered instantly without requiring polling or manual refresh.** ⚡

---

##  Testing Real-Time Updates

### Single Browser (Multiple Tabs)
1. Open http://localhost:3000 in Tab 1
2. Open http://localhost:3000 in Tab 2
3. Update score in Tab 1
4. Tab 2 updates instantly! ✨

### Multiple Devices
1. Device A: http://your-ip:3000
2. Device B: http://your-ip:3000
3. Update on Device A
4. Device B updates instantly! ✨

### Apollo Studio (Developer Testing)
1. Open http://localhost:4000/graphql
2. Tab 1: Run subscription
3. Tab 2: Run mutation
4. Watch subscription receive update instantly

---

##  UI Features

- **Beautiful gradient background** (purple to violet)
- **Animated score display** (pulses when updated)
- **Live status badge** (pulsing red indicator)
- **Markets/Odds display** (betting information)
- **Quick update buttons** (1-0, 1-1, 2-0, etc.)
- **Manual score input** (type your own score)
- **Responsive design** (works on all devices)
- **Smooth animations** (professional feel)
- **Real-time feedback** (status messages)

---

##  Performance

| Operation | Speed |
|-----------|-------|
| Query response | < 100ms |
| Mutation response | < 100ms |
| Subscription event delivery | < 50ms |
| UI animation | 0.6s (visual effect) |
| WebSocket latency | ~10-50ms |

**Result:** Users see updates almost instantly! ⚡

---

## Troubleshooting

**Server won't start?**
- Check port 4000 is free: `lsof -i :4000`
- Kill process if needed: `lsof -i :4000 | grep LISTEN | awk '{print $2}' | xargs kill -9`

**Frontend won't connect?**
- Backend must be running first
- Check Backend is at http://localhost:4000/graphql
- Open browser console for errors

**Subscriptions not working?**
- Check WebSocket is connecting: browser DevTools → Network → filter "ws"
- Check mutation is published correctly
- Check subscription variables match

**Real-time not updating?**
- Check Apollo Client subscription is active
- Check asyncIterator is properly set up
- Check PubSub event channel names match

---

## Quick Reference

### Ports
- Backend: 4000
- Frontend: 3000

### GraphQL Endpoints
- HTTP: http://localhost:4000/graphql
- WebSocket: ws://localhost:4000/graphql

### File Quick Links
- Schema: [graphql/schema.js](graphql/schema.js)
- Resolvers: [graphql/resolvers.js](graphql/resolvers.js)
- PubSub: [pubsub/pubsub.js](pubsub/pubsub.js)
- React App: [client/src/App.js](client/src/App.js)
- Queries: [client/src/queries.js](client/src/queries.js)

### Commands
```bash
# Start backend
npm start

# Start frontend
cd client && npm start

# Stop server
Ctrl+C

# Check port
lsof -i :4000  # or :3000
```

---

## Future Improvements

For production-scale systems the following enhancements could be considered:

- Replace in-memory PubSub with Redis
- Store match data in a database
- Add authentication and authorization
- Deploy using containerized services