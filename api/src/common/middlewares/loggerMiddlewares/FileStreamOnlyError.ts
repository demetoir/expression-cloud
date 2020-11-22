import {
	createRotateLogStream,
	FormatBuilder,
	morganToolkit,
	TokenParser,
} from '../../libs/morganToolkit';

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
		skip(req, res) {
			return res.statusCode < 400;
		},
	},
);

export { FileStreamOnlyError };
