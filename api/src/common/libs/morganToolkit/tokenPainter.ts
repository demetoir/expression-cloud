import * as chalk from 'chalk';

export class TokenPainter {
	static paintColor(tokens: any): any {
		const remoteAddr = chalk.yellow(tokens.remoteAddr);
		const remoteUser = chalk.yellow(tokens.remoteUser || '');
		const httpVersion = chalk.white(tokens.httpVersion);

		const contentLength = chalk.yellow(tokens.contentLength);

		const method = chalk.hex('#34ace0').bold(tokens.method);

		const status = chalk.hex('#ffb142').bold(tokens.status);

		const url = chalk.white.bold(tokens.url);
		const responseTime = chalk.hex('#2ed573').bold(tokens.responseTime);

		const date = chalk.white.bold(tokens.date);
		const referrer = chalk.hex('#fffa65').bold(tokens.referrer || '');
		const userAgent = chalk.hex('#1e90ff')(tokens.userAgent || '');

		return {
			remoteAddr,
			remoteUser,
			httpVersion,
			contentLength,
			method,
			status,
			url,
			responseTime,
			date,
			referrer,
			userAgent,
		};
	}
}
