const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;  // The same port the Arduino is sending to

// Middleware to parse the JSON request body
app.use(bodyParser.json());

// Route to handle POST requests from the Arduino
app.post('/data', (req, res) => {
  const { message } = req.body;  // Extract the "message" from the request body

  if (!message) {
    // If the "message" field is missing, return an error response
    return res.status(400).send('Invalid data format: "message" field is required');
  }

  // Log the received message to the console
  console.log('Received message from Arduino:', message);

  // Send a success response back to Arduino
  res.status(200).send('Message received successfully');
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server running and listening on port ${PORT}`);
});
