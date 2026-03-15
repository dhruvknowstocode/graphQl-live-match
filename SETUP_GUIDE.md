# 🚀 Complete Setup & Running Guide

## Project Structure

```
graphql-liveMatch/
├── server.js                      # GraphQL Server
├── package.json
├── graphql/
│   ├── schema.js
│   └── resolvers.js
├── data/
│   └── matches.js
├── pubsub/
│   └── pubsub.js
├── EXPLANATION.md
├── DETAILED_EXPLANATION.md
└── client/                        # React Frontend (NEW!)
    ├── src/
    │   ├── App.js
    │   ├── MatchCard.js
    │   ├── apolloClient.js
    │   ├── queries.js
    │   └── ...
    ├── public/
    └── package.json
```

---

## ⚙️ Installation Steps

### 1. Backend Setup (GraphQL Server)

```bash
# Navigate to project root
cd /Users/dhruvjain/Desktop/graphql-liveMatch

# Install backend dependencies (if not already done)
npm install express apollo-server-express graphql graphql-subscriptions graphql-ws ws graphql-tools --legacy-peer-deps

# Start the GraphQL server
node server.js
```

**Expected Output:**
```
This package has been deprecated and now it only exports makeExecutableSchema...
Server running at http://localhost:4000/graphql
WebSocket subscriptions available at ws://localhost:4000/graphql
```

✅ **Backend is now running on port 4000**

---

### 2. Frontend Setup (React App)

**In a NEW terminal window:**

```bash
# Navigate to client directory
cd /Users/dhruvjain/Desktop/graphql-liveMatch/client

# Install frontend dependencies
npm install

# Start the React development server
npm start
```

**Expected Output:**
```
> graphql-livematch-client@1.0.0 start
> react-scripts start

Compiled successfully!

You can now view graphql-livematch-client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

✅ **Frontend is now running on port 3000**
✅ **Browser automatically opens http://localhost:3000**

---

## 🎯 Now You Have Two Servers Running!

| Server | URL | Purpose |
|--------|-----|---------|
| **GraphQL API** | http://localhost:4000/graphql | Data and real-time updates |
| **React App** | http://localhost:3000 | Beautiful UI |

---

## 🎬 Testing Real-Time Updates

### Method 1: Single Browser (Both Tabs)

1. **Tab 1**: Open http://localhost:3000
   - You see the match card with "Liverpool vs Chelsea"
   - Click "Update" and enter a score like "1-0"

2. **Tab 2**: Open http://localhost:3000 in same browser
   - Same match appears
   - Tab 1 updates score to "1-0"
   - ✅ **Tab 2 INSTANTLY shows "1-0"** (no refresh!)

### Method 2: Multiple Devices

1. **Device A**: http://localhost:3000 (or your-ip:3000)
2. **Device B**: http://localhost:3000 on another device
3. Update score on Device A
4. ✅ **Device B updates instantly!**

### Method 3: Apollo Studio (For Testing)

1. Open http://localhost:4000/graphql in browser
2. Use **Tab 1** for subscription
3. Use **Tab 2** for mutation
4. Watch real-time updates flow

---

## 📋 What Each Component Does

### **Backend (Node.js + Express + Apollo)**

- **server.js**: Starts HTTP + WebSocket servers
- **schema.js**: Defines GraphQL types (Match, Query, Mutation, Subscription)
- **resolvers.js**: Implements business logic + PubSub
- **pubsub.js**: Event broadcasting system
- **matches.js**: In-memory data storage

### **Frontend (React + Apollo Client)**

- **App.js**: Main component, sets up Apollo Provider
- **MatchCard.js**: Displays match with real-time updates
- **apolloClient.js**: Configures Apollo Client (HTTP + WebSocket)
- **queries.js**: GraphQL operations (queries, mutations, subscriptions)
- **index.js**: React entry point

---

## 🔄 How Real-Time Updates Work

```
User updates score in React UI
    ↓
React sends MUTATION to GraphQL server
    ↓
GraphQL server updates in-memory data
    ↓
pubsub.publish("SCORE_UPDATED:1", newMatch) ← Broadcast event
    ↓
asyncIterator in subscription hears event
    ↓
Apollo sends data to ALL connected WebSocket clients
    ↓
React receives update and re-renders
    ↓
Score changes INSTANTLY on screen! ⚡
```

---

## 🐛 Troubleshooting

### Problem: "Cannot connect to server"
```
Error: Could not connect to ws://localhost:4000/graphql
```
**Solution:**
- Make sure backend is running: `node server.js`
- Check port 4000 is available: `lsof -i :4000`

### Problem: "Apollo Client not connecting"
```
Error: Network error: fetch failed
```
**Solution:**
- Backend must be started first
- Check backend is at `http://localhost:4000/graphql`

### Problem: "Port 3000 already in use"
```
Error: EADDRINUSE: address already in use :::3000
```
**Solution:**
```bash
# Kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Problem: "Port 4000 already in use"
```
Error: listen EADDRINUSE: address already in use :::4000
```
**Solution:**
```bash
# Kill process on port 4000
lsof -i :4000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Or edit server.js to use different port
# Change: httpServer.listen(4000)
# To: httpServer.listen(5000)
```

### Problem: "Module not found"
```
Error: Cannot find module '@apollo/client'
```
**Solution:**
```bash
# Install all dependencies
npm install

# For client:
cd client && npm install
```

---

## 📝 Quick Commands Cheat Sheet

```bash
# Start backend (port 4000)
cd /Users/dhruvjain/Desktop/graphql-liveMatch
npm start  # or: node server.js

# Start frontend (port 3000) - in ANOTHER terminal
cd /Users/dhruvjain/Desktop/graphql-liveMatch/client
npm start

# Stop servers
Ctrl+C (in each terminal)

# View backend logs
tail -f server.log

# Test GraphQL endpoint
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { matches { id teamA teamB score } }"}'
```

---

## 🎨 UI Features Showcase

### Real-Time Score Updates
- Score animates when it changes
- Pulsing scale effect (1 second animation)

### Status Indicator
- 🔴 **LIVE**: Match is ongoing (pulsing)
- ⚪ **FINISHED**: Match ended (static)

### Markets Display
- Shows betting odds
- Updates with match data
- Professional formatting

### Quick Update Buttons
- Pre-filled scores: 1-0, 1-1, 2-0, 2-1, 2-2, 3-0
- One-click updates
- Great for demos

### Input Field
- Manual score entry
- Format: "teamA-teamB" (e.g., "3-2")
- Validation and error handling

### Animations
- Header slides down
- Card scales on hover
- Score pulses on update
- Loading spinner during fetch
- Smooth transitions

### Responsive Design
- Works on desktop
- Responsive on tablet
- Mobile-friendly layout

---

## 📊 System Requirements

- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **Ports available**: 3000, 4000 (or modify in code)
- **Modern browser**: Chrome, Firefox, Safari, Edge

---

## 🚀 Deployment (Future)

### Backend Deployment
- Deploy Node.js server to Heroku, AWS, DigitalOcean
- Update WebSocket URL in frontend
- Use Redis PubSub instead of in-memory
- Add database (MongoDB, PostgreSQL)

### Frontend Deployment
- Build: `npm run build`
- Deploy to Vercel, Netlify, AWS Amplify
- Update `REACT_APP_GRAPHQL_URL` env variable

---

## 📚 Documentation Files

1. **EXPLANATION.md** - Quick overview (read this first!)
2. **DETAILED_EXPLANATION.md** - Complete technical deep-dive
3. **client/README.md** - Frontend-specific documentation
4. **THIS FILE** - Setup and running guide

---

## ✨ That's It!

You now have:
✅ GraphQL backend with real-time subscriptions  
✅ Beautiful React frontend  
✅ Real-time score updates flowing between all connected clients  

**Time to showcase to your seniors!** 🎉

---

## 💡 Pro Tips for Presentation

1. **Use two devices/browsers**
   - Show real-time sync between screens
   - Most impressive feature!

2. **Show the architecture**
   - Explain: Query → HTTP, Subscription → WebSocket
   - Show: PubSub event flow

3. **Demonstrate error handling**
   - Try invalid scores
   - Show error messages

4. **Explain the advantages**
   - REST would need polling every 2 seconds
   - GraphQL subscriptions: instant, efficient, real-time

5. **Mention scalability**
   - Current: In-memory PubSub
   - Future: Redis for multi-server setup

---

Need help? Check the detailed explanation files or look at the code comments! 🚀
