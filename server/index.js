const express = require('express');
const routes = require('./routes/router');
const cors = require('cors');
const bodyParser = require('body-parser')
const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = require('http').createServer(app);

const port = process.env.PORT || 8000;

app.use(cors());
app.use(errorHandler);
app.use(bodyParser.json({limit: '5mb'}));
app.use(routes);
console.log('test')


server.listen(port, () => {
  console.log('\x1b[36m%s\x1b[0m', `Listening on port ${port}`);
});
