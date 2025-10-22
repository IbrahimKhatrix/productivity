import { WebSocketServer, WebSocket } from 'ws';

const PORT = process.env.PORT || 3000;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server running on ws://0.0.0.0:${PORT}`);

// Handle real clients
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (msg) => {
    console.log('Received:', msg.toString());
    ws.send(`Echo: ${msg}`);
  });

  ws.on('close', () => console.log('Client disconnected'));
});

// Keep-alive broadcast every 2 minutes
setInterval(() => {
  const now = new Date().toISOString();
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) client.send(`Time: ${now}`);
  });
  console.log(`Broadcasted time: ${now}`);
}, 2 * 60 * 1000);

// ---- Self-connect hack to keep server alive ----
let selfClient;
function connectSelf() {
  selfClient = new WebSocket(`ws://localhost:${PORT}`);
  
  selfClient.on('open', () => {
    console.log('Self-client connected to keep alive');
    // Send a heartbeat every 2 minutes
    setInterval(() => selfClient.send('heartbeat'), 2 * 60 * 1000);
  });

  selfClient.on('message', (msg) => console.log(`Self-client received: ${msg}`));
  selfClient.on('close', () => {
    console.log('Self-client disconnected, reconnecting...');
    setTimeout(connectSelf, 1000); // reconnect if somehow disconnected
  });

  selfClient.on('error', (err) => console.error('Self-client error:', err));
}

// Start self-connection
connectSelf();
