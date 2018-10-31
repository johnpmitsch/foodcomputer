const appRoot = require("app-root-path");
const { createLogger, format, transports } = require("winston");

const { combine, timestamp, label, printf } = format;
const env = process.env.NODE_ENV || "development";

const options = {
  file: {
    level: process.env.LOG_LEVEL || "info",
    filename: `${appRoot}/logs/${env}.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const customFormat = printf(
  info => `[${info.label}] ${info.level}: ${info.message}`
);

const logger = createLogger({
  format: combine(label({ label: "foodcomputer" }), timestamp(), customFormat),
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
  write(message, _encoding) {
    logger.info(message);
  }
};
module.exports = logger;
