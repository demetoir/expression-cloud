import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class NodeConfigService {
	constructor(private configService: ConfigService) {}

	get port(): string {
		return this.configService.get<string>('NODE_PORT');
	}

	get nodeEnv(): string {
		return this.configService.get<string>('NODE_ENV');
	}
}
