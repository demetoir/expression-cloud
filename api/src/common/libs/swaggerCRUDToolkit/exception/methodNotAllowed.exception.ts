import { ApiResponseProperty } from '../responseDecorator/apiResponseProperty.decorator';

export class MethodNotAllowedException {
	@ApiResponseProperty({
		example: 405,
	})
	statusCode: number;

	@ApiResponseProperty({
		example: 'MethodNotAllowed',
	})
	error: string;

	@ApiResponseProperty({
		example: `$method MethodNotAllowed`,
	})
	message: string;
}
