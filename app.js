const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', routes);

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`)
})