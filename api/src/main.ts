import { NodeConfigService } from './config/NodeConfig.service';
import { INestApplication } from '@nestjs/common';
import express from 'express';
import { appFactory } from './app.factory';

async function start() {
	const app: INestApplication = await appFactory(express());

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
