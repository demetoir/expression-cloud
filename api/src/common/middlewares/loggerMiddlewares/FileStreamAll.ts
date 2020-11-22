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
const FileStreamAll = morganToolkit(
	function (tokens, req, res) {
		const parserToken = TokenParser.parse(tokens, req, res);

		return FormatBuilder.build(null, parserToken);
	},
	{
		stream: createRotateLogStream({ signature: 'morgan-all' }),
	},
);

export { FileStreamAll };
