import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { logger } from '../libs/winstonToolkit';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService implements LoggerService {
	private logger: any;

	constructor() {
		this.logger = logger;
	}

	log(message: string) {
		this.logger.info(message);
	}

	error(message: string, trace: string) {
		this.logger.error(`message\n${trace}`);
	}

	warn(message: string) {
		this.logger.warn(message);
	}

	debug(message: string) {
		this.logger.debug(message);
	}

	verbose(message: string) {
		this.logger.silly(message);
	}
}
