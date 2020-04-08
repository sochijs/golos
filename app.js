const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const ONE_DAY = 1000 * 60 * 60 * 24;
const PORT = config.get('port') || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const store = new MongoStore({
  collection: 'sessions',
  uri: config.get('mongoUri')
});

app.use(cors());
app.use(express.json({extended: true}));
app.use(session({
  name: config.get('sessionName'),
  resave: false,
  saveUninitialized: false,
  secret: config.get('sessionSecret'),
  cookie: {
    maxAge: ONE_DAY,
    sameSite: true,
    secure: false
  },
  store
}));

app.use(require('./middleware/auth'));

app.use('/api/vote', require('./routes/vote.routes'));

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    server.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}...`);
    });

    io.on('connection', (socket) => {

      socket.on('join', ({voteId}) => {
        console.log('join');
        socket.join(voteId);
      });

      socket.on('choice', ({vote, voteId, userAnswerId}, callback) => {
        io.to(voteId).emit('userChoice', {vote, userAnswerId});
      });

      socket.on('disconnect', () => {
        console.log('disconnect');
      });
    });
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();