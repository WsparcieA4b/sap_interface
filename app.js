"use strict";
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const morgan = require('morgan');
const pg = require('pg');
const cors = require('cors');
const logger = require('./log-config');
const conf = require('./helpers/api.config');
//const helmet = require('helmet')
const { createLogger, transports } = require('winston');
pg.types.setTypeParser(1184, str => moment(str).format());

const port = conf.api_port.port; //config portu
const numeral = require('numeral');
const app = express();

// app.use(helmet())
// app.use(helmet.hidePoweredBy())

// load a locale
numeral.register('locale', 'pl', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'tys',
    million: 'mln',
    billion: 'bln',
    trillion: 'tr'
  },
  ordinal: function (number) {
    return number === 1 ? 'er' : 'ème';
  },
  currency: {
    symbol: 'PLN'
  }
});

// switch between locales
numeral.locale('pl');

//process.env.NODE_ENV = 'production'; //ustawioen w /etc/enviroments
const corsConfig = conf.corsOptions;
//init bodyParser to extract properties from POST data
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(morgan('dev'));


const ENV = app.get('env');
if (ENV === 'production') {
  app.options('*', cors(corsConfig)) // include before other routes
} else {
  const opt = {
    origin: ["http://localhost:4200", "http://localhost:4300"], //aplikacja Angulara
    exposedHeaders: ['x-filename', 'etag'],
    allowedHeaders: ['x-filename', 'etag'],
    optionsSuccessStatus: 200
  }
  app.options('*', cors(corsConfig)) // include before other routes
}

//Routing
app.use(cors(corsConfig), require('./controllers_unauth'))
const verToken = require('./middlewares/varify-token');
app.use(cors(corsConfig), verToken, require('./controllers'))  //z autentykacją tokenem JWT

//app.use(cors(corsConfig), require('./controllers')) /// bez autentykacj tokenem JWT -TESTY!!!!

//error handler
console.log('ENV variable is: ' + ENV)
if (ENV === 'development') {
  app.use(function (err, req, res, next) {
    logger.error(err);
    let erO = { message: err.message, msg: err.message, error: JSON.stringify(err) }
    res.status(err.status || 500).json(erO);
  });
}
// production error handler // no stacktraces leaked to user
if (ENV === 'production') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.status(err.status || 500).json({
      message: err.message
    });
    logger.error(err);
  });
}

process.stdin.resume();//so the program will not close instantly
function exitHandler(options, exitCode) {
  console.log('Cleaning active Interval functions ...');
  // wywołania fuknkcji których tutaj nie ma
  if (options.cleanup) console.log('exitHandler -  clean');
  if (exitCode || exitCode === 0) console.log('exitHandler - exit CODE:', exitCode);
  if (options.exit) process.exit();
}
//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));
process.on('SIGINT', exitHandler.bind(null, { exit: true }));  //catches ctrl+c event
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));//catches uncaught exceptions
//custom order handlers
logger.exceptions.handle(
  new transports.File({ filename: 'logs/exceptions.log' })
);

//ready to go !
logger.info('Server starting... at ' + new Date());
app.listen(port, function () {
  console.log('Server API listening on port ' + port)
})

