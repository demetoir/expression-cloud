import { ApiResponseProperty } from '../responseDecorator/apiResponseProperty.decorator';

export class UnauthorizedException {
	@ApiResponseProperty({
		example: 401,
	})
	statusCode: number;

	@ApiResponseProperty({
		example: 'Unauthorized',
	})
	error: string;

	@ApiResponseProperty({
		example: `Unauthorized resource`,
	})
	message: string;
}
