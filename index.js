import { WebSocketServer } from 'ws';  // ⚡ correct
const PORT = process.env.PORT || 3000;

const wss = new WebSocketServer({ port: PORT });  // ✅ works

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (msg) => {
    console.log('Received:', msg);
    ws.send(`Echo: ${msg}`);
  });

  ws.on('close', () => console.log('Client disconnected'));
});

console.log(`WebSocket server running on ws://0.0.0.0:${PORT}`);
