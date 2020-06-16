const { morganToolkit, TokenParser, FormatBuilder, createRotateLogStream } = require('../morganToolkit');

/**
 *
 * @returns {e.RequestHandler | *}
 * @constructor
 */

const FileStreamAll = morganToolkit(
	function (tokens, req, res) {
		const parserToken = TokenParser.parse(tokens, req, res);
		return FormatBuilder.build(null, parserToken);
	},
	{
		stream: createRotateLogStream({ signature: 'morgan-all' }),
	},
);

module.exports.FileStreamAll = FileStreamAll;
