/* const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set up the CORS headers to allow access from any domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Set up the response headers for server-sent events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send a message to the client every 5 seconds
  setInterval(() => {
    const message = `Hello from server at ${new Date().toLocaleTimeString()}`;
    res.write(`data: ${message}\n\n`);
  }, 5000);
});

// Start the server
server.listen(3000, () => {
  console.log('Server started on port 3000');
}); */


const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set up the CORS headers to allow access from any domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Set up the response headers for server-sent events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  if (req.method === 'POST') {

    console.log()
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log(`Received data: ${body}`);
      res.end(`Received data: ${body}`);
    });
  } else {
    // Send a message to the client every 5 seconds
    setInterval(() => {
      const message = `Hello from server at ${new Date().toLocaleTimeString()}`;
      res.write(`data: ${message}\n\n`);
    }, 5000);
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server started on port 3000');
});