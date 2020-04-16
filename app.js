const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const WebSocket = require('ws');

const ONE_DAY = 1000 * 60 * 60 * 24;
const PORT = config.get('port') || 5000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({port: 8080});

const store = new MongoStore({
  collection: 'sessions',
  uri: config.get('mongoUri')
});

app.use(cors());
app.use(helmet());
app.use(compression());
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

    wss.on('connection', (ws) => {
      ws.on('message', (data) => {
        const {type, message} = JSON.parse(data);
        switch (type) {
          case 'choice':
            wss.clients.forEach((client) => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  type: 'userChoice',
                  message: {
                    vote: message.vote
                  }
                }));
              }
            });
            break;
          default:
            break;
        }
      });
    });

  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();