const chalk = require('chalk');
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

// import { createLogger, format, loggers, transports } from 'winston';
// import * as DailyRotateFile from 'winston-daily-rotate-file';
// import * as chalk from 'chalk';

const { combine, timestamp, printf, errors } = format;

const levelToChalk = {
	info: chalk.greenBright,
	debug: chalk.white,
	warn: chalk.yellowBright,
	error: chalk.redBright,
	silly: chalk.blueBright,
};

const convertToFormat = ({ level, message, stack, timestamp }) => {
	let msg = message;

	if (typeof message === 'object') {
		msg = JSON.stringify(message, null, 4);
	}

	let format;

	if (stack) {
		format = `${timestamp} [${level.toUpperCase()}]: ${msg} - ${stack}`;
	} else {
		format = `${timestamp} [${level.toUpperCase()}]: ${msg}`;
	}

	return format;
};

const addColor = ({ message, level }) => {
	const color = levelToChalk[level];

	return color(` ${message}`);
};

const stdoutPrintf = printf((args) => {
	const { level, message, stack, timestamp, pretty } = args;

	const formattedMessage = convertToFormat({
		message,
		stack,
		timestamp,
		level,
	});

	return addColor({ message: formattedMessage, level });
});

const LOGGER_LEVEL = {
	SILLY: 'silly',
	INFO: 'info',
	DEBUG: 'debug',
	WARN: 'warn',
	ERROR: 'error',
};

const errorLogTransport = new DailyRotateFile({
	filename: './.log/error-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '14d',
	level: LOGGER_LEVEL.ERROR,
});

const combineLogTransport = new DailyRotateFile({
	filename: './.log/combine-%DATE%.log',
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '20m',
	maxFiles: '14d',
	level: LOGGER_LEVEL.INFO,
});

const consoleLogger = new transports.Console();

const config = {
	level: LOGGER_LEVEL.INFO,
	format: combine(errors({ stack: true }), timestamp(), stdoutPrintf),
	transports: [errorLogTransport, combineLogTransport, consoleLogger],
};

const logger = createLogger({
	level: LOGGER_LEVEL.INFO,
	format: combine(errors({ stack: true }), timestamp(), stdoutPrintf),
	transports: [errorLogTransport, combineLogTransport, consoleLogger],
});

// todo add test
// todo add jsdoc
// todo add types define
//
// exports.logger = logger;
// exports.config = config;
export { logger };
