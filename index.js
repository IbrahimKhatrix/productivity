import { WebSocketServer } from 'ws';
import http from 'http';

const PORT = process.env.PORT || 3000;

// HTTP server for pings
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('I am alive!');
});

// WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (msg) => ws.send(`Echo: ${msg}`));
  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
