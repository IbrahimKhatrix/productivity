import { WebSocketServer, WebSocket } from 'ws';

const PORT = process.env.PORT || 3000;
const wss = new WebSocketServer({ port: PORT });

console.log(`server running on ws://0.0.0.0:${PORT}`);

wss.on('connection', (ws) => {
  console.log('connected');

  ws.on('message', (msg) => {
    console.log('Received:', msg.toString());
    ws.send(`Echo: ${msg}`);
  });

  ws.on('close', () => console.log('Client disconnected'));
});
