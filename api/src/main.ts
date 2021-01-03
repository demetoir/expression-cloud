import { INestApplication } from '@nestjs/common';
import * as express from 'express';
import { NodeConfigService } from 'src/config';
import { appFactory } from 'src/app';

async function start() {
	const expressApp = express();

	const app: INestApplication = await appFactory(expressApp);

	const nodeConfigService = app.get(NodeConfigService);

	await app.listen(nodeConfigService.port);

	console.log(`app listen port ${nodeConfigService.port}`);
}

start()
	.then(() => {
		console.log('complete bootstrapping app');
	})
	.catch((e) => {
		console.error('fail to bootstrap app');
		console.error(e);
	});
