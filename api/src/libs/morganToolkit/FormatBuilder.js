module.exports.FormatBuilder = class FormatBuilder {
	static build(format, tokens) {
		return `${tokens.remoteAddr} - ${tokens.remoteUser} [${tokens.date}] "${tokens.method} ${tokens.status} ${tokens.url} HTTP/${tokens.httpVersion}" ${tokens.responseTime} ${tokens.contentLength}" - "${tokens.referrer} ${tokens.userAgent}"`;
	}
};
