import { Server } from 'http';
import { Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
import * as express from 'express';
import { appFactory } from 'src/app';

async function bootstrap(): Promise<Server> {
	const expressApp = express();

	const app = await appFactory(expressApp);
	await app.init();

	return createServer(expressApp);
}

let cachedServer: Server;

export async function handler(event: any, context: Context): Promise<Response> {
	if (!cachedServer) {
		const server = await bootstrap();

		cachedServer = server;
	}

	return proxy(cachedServer, event, context, 'PROMISE').promise;
}
