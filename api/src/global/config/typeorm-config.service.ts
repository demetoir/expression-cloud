import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class TypeormConfigService {
	constructor(private configService: ConfigService) {}

	get type(): string {
		return this.configService.get<string>('TYPEORM_TYPE');
	}

	get host(): string {
		return this.configService.get<string>('TYPEORM_HOST');
	}

	get port(): number {
		return this.configService.get<number>('TYPEORM_PORT');
	}

	get username(): string {
		return this.configService.get<string>('TYPEORM_USERNAME');
	}

	get password(): string {
		return this.configService.get<string>('TYPEORM_PASSWORD');
	}

	get database(): string {
		return this.configService.get<string>('TYPEORM_DATABASE');
	}
}
