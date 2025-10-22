const http = require('http');

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ prod: true }));
}).listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✅`);
});
