// const AppError = require('../utils/appError');

// ---------------------------DEVELOPMENT-------------------------
const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
    stack: err.stack,
  });
};
// ----------------------------PRODUCTION-------------------------
const sendErrorProd = (err, req, res) => {
  // Operational, known error:send to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming unknown error
  console.error('Error 💥', err);
  // send generic message
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong !',
  });
};
// -----------------------------------------------------------------
// -----------------------------------------------------------------

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, req, res);
  }
};
