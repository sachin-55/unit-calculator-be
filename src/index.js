const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const userRouter = require('./routes/userRoutes');
const collectionRouter = require('./routes/collectionRoutes');
const submeterRouter = require('./routes/submeterRoutes');
const readingRouter = require('./routes/readingRoutes');

const app = express();

// Global middlewares
app.use(morgan('dev'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ inflate: true, extended: true }));

// API
app.get('/', (req, res) => {
  res.send('Hi! Welcome');
});

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/collections', collectionRouter);
app.use('/api/v1/submeters', submeterRouter);
app.use('/api/v1/readings', readingRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!`, 404));
});
// Global error routes
app.use(globalErrorHandler);

module.exports = app;
