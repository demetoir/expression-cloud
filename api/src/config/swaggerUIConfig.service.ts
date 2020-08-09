import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class SwaggerUIConfigService {
	constructor(private configService: ConfigService) {}

	get path(): string {
		return this.configService.get<string>('SWAGGER_UI_PATH');
	}
}
