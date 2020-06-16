const { morganToolkit, TokenParser, FormatBuilder, TokenPainter } = require('../morganToolkit');

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
		skip: function (req, res) {
			const { url } = req;
			// ignore static route request
			const skipFilter = [/\/font/, /\/image/, /\/js/, /\/scss/, /\/thridParty/, /\/ELB-HealthChecker/];

			return skipFilter.some((reg) => reg.test(url));
		},
	},
);

module.exports.StdOut = StdOut;
