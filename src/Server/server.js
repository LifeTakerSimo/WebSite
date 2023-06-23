const http = require('http');
const { getTexts } = require('./../Controllers/homeController');

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Set the response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Set appropriate CORS headers

  // Handle the API routes
  if (req.url === '/api/texts' && req.method === 'GET') {
    // Call the getTexts function from the controller
    getTexts(req, res);
  } else {
    // Handle invalid routes or methods
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Invalid route or method' }));
  }
});

// Set the port for the server to listen on
const port = 4000;

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
