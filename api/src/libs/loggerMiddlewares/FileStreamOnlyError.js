const { morganToolkit, TokenParser, FormatBuilder, createRotateLogStream } = require('../morganToolkit');

/**
 *
 * @returns {e.RequestHandler | *}
 * @constructor
 */
const FileStreamOnlyError = morganToolkit(
	function (tokens, req, res) {
		const parserToken = TokenParser.parse(tokens, req, res);
		return FormatBuilder.build(null, parserToken);
	},
	{
		stream: createRotateLogStream({ signature: 'morgan-error' }),
		// skip logging on return true
		skip: function (req, res) {
			return res.statusCode < 400;
		},
	},
);

module.exports.FileStreamOnlyError = FileStreamOnlyError;
