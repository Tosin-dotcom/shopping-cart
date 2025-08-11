let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let morganMiddleware = require('morgan');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { initModels } = require('./models');
const {status} = require('http-status');
const logger = require('./utils/logger')

let app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morganMiddleware('combined', {
  stream: {
    write: (message) => logger.http(message.trim()),
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.use((req, res, next) => {
  res.status(status.NOT_FOUND).json({ success: false, error: 'Route not found' });
});

app.use(errorHandler);


initModels()
.then(() => {
  logger.info('DB initialized');
})
.catch((err) => {
  logger.error('DB Sync failed', err)
});


module.exports = app;
