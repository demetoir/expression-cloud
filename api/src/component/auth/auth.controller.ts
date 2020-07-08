import { Controller } from '@nestjs/common';
import { logger } from '../../libs/winstonToolkit';

@Controller('auth')
export class AuthController {
	private logger: any;

	constructor() {
		this.logger = logger;
	}
}
