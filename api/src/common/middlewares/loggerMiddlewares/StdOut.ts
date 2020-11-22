import {
	FormatBuilder,
	morganToolkit,
	TokenPainter,
	TokenParser,
} from '../../libs/morganToolkit';

/**
 *
 * @returns {e.RequestHandler | *}
 * @constructor
 */
const StdOut = morganToolkit(
	function (tokens, req, res) {
		const parserToken = TokenParser.parse(tokens, req, res);
		const colorizedToken = TokenPainter.paintColor(parserToken);

		return FormatBuilder.build(null, colorizedToken);
	},
	{
		// skip logging on return true
		skip(req) {
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

export { StdOut };
