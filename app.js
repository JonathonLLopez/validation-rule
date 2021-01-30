const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', routes);

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log(`Listening on port ${process.env.PORT || 5000}`)
})