var winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { label, timestamp, simple, colorize, printf, prettyPrint, splat } = format || {}

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message} `;
});

var logger = winston.createLogger({
    format: format.combine(
        timestamp(),
        simple(),
        splat(),        //nie widac efektu
        printf(({ level, message }) => `${level}: ${message}`),
        format.errors({ stack: true, prettyPrint: true }),
    ),
    transports: [
        new winston.transports.Console({
            name: 'debug-console',
            level: 'info',
            //prettyPrint: true,
            handleExceptions: true,
            json: false,
            colorize: true,
            prettyPrint: function (object) {
                return JSON.stringify(object);
            },
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            colorize: true,
            prettyPrint: function (object) {
                return JSON.stringify(object);
            },
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            level: 'info'
        })
    ],
    exitOnError: false // don't crush no error
});
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;


