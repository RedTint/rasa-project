// import express framework
const express = require('express');

// import body-parser that is used by express framework
// to determine how it would interpret incoming data
const bodyParser = require('body-parser');

// initialize express
const app = express();

// tell express to parse HTTP request bodies as JSON
const jsonParser = bodyParser.json();

// create a route for /api/customers
app.post('/bot', jsonParser, (req, res) => {
  console.log('/bot endpoint was called');
  res.status(200); // set 200 (OK) status
  const { body, query, params } = req;
  res.send({ body, query, params }); // send response
});

// start API
const port = 5034;
app.listen(port, () => {
  console.log(`You are now listening to http://localhost:${port}`);
});
