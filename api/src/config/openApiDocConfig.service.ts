import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class OpenApiDocConfigService {
	constructor(private configService: ConfigService) {}

	get swaggerUIPath(): string {
		return this.configService.get<string>('SWAGGER_UI_PATH');
	}

	get redocPath(): string {
		return this.configService.get<string>('REDOC_PATH');
	}
}
