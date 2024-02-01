require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const ErrorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/constants');
// const auth = require('./middlewares/auth');
// const rateLimit = require('express-rate-limit');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cors());

// const limiter = rateLimit ({
//   windowMs: 15*60*1000,
//   max:100,
// });
app.use(limiter);

app.use(helmet());
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use('/', require('./routes/index'));

// app.use('/users', require('./routes/users'));
// app.use('/cards', require('./routes/cards'));
// app.use('/signup', require('./routes/signup'));
// app.use('/signin', require('./routes/signin'));
// app.use(auth);

app.use(errorLogger);

app.use(errors());

app.use(ErrorHandler);

app.use(router);

app.listen(PORT);
