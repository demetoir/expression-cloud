const { TokenParser } = require('./tokenPraser.js');
const { TokenPainter } = require('./tokenPainter.js');
const { FormatBuilder } = require('./FormatBuilder.js');
const { createRotateLogStream } = require('./createRotateLogStream.js');
const morgan = require('morgan');

/**
 *
 * @param format
 * @param option
 * @returns {e.RequestHandler | *}
 */
const morganToolkit = function (format, option) {
	return morgan(format, option);
};

module.exports = {
	morganToolkit,
	TokenParser,
	TokenPainter,
	FormatBuilder,
	createRotateLogStream,
};
