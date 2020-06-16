module.exports.TokenParser = class TokenParser {
	static parse(tokens, req, res) {
		const remoteAddr = tokens['remote-addr'](req, res);
		const remoteUser = tokens['remote-user'](req, res) || '';
		const httpVersion = tokens['http-version'](req, res);

		const contentLength = `${tokens.res(req, res, 'content-length') || 0} bytes`;

		const method = tokens.method(req, res);

		const status = tokens.status(req, res);

		const url = tokens.url(req, res);
		const responseTime = `${tokens['response-time'](req, res)} ms`;

		const date = tokens.date(req, res);
		const referrer = tokens.referrer(req, res) || '';
		const userAgent = tokens['user-agent'](req, res) || '';

		return {
			remoteAddr,
			remoteUser,
			httpVersion,
			contentLength,
			method,
			status,
			url,
			date,
			referrer,
			userAgent,
			responseTime,
		};
	}
};
