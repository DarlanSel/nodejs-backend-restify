const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
  mongoose.connect(config.MONGODB_URI, {}).then(() => {
    console.log('Connected to MongoDB.');
  }).catch((e) => {
    console.log('Error connecting to MongoDB');
    console.log(e);
  });
});

const db = mongoose.connection;

db.on('error', e => console.log(e));

db.once('open', () => {
  require('./routes/rate_routes')(server);
  console.log(`Server started on port ${config.PORT}`);
});
