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
const FileStreamOnlyNoneStaticRequest = morganToolkit(
	function (tokens, req, res) {
		const parserToken = TokenParser.parse(tokens, req, res);

		return FormatBuilder.build(null, parserToken);
	},
	{
		stream: createRotateLogStream({ signature: 'morgan-nonStaticRequest' }),

		// skip logging on return true
		skip(req, res) {
			const { url } = req;
			// ignore static route request
			const skipFilter = [
				/\/font/,
				/\/image/,
				/\/js/,
				/\/scss/,
				/\/thridParty/,
				/\/ELB-HealthChecker/,
			];

			return skipFilter.some((reg) => reg.test(url));
		},
	},
);

export { FileStreamOnlyNoneStaticRequest };
