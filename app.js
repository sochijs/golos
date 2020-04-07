const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

const ONE_DAY = 1000 * 60 * 60 * 24;

const app = express();

const store = new MongoStore({
  collection: 'sessions',
  uri: config.get('mongoUri')
});

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

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}...`);
    });
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();