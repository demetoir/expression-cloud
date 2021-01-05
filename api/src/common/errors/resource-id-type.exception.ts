import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceIdTypeException extends HttpException {
	constructor(id: string, type: string) {
		super(
			{
				error: `resource id type error`,
				message: `user resource id expect ${type}`,
			},
			HttpStatus.BAD_REQUEST,
		);
	}
}
