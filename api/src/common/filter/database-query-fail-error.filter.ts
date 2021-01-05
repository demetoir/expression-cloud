import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseConstraintFailError, DbQueryFailError } from 'src/common';

@Catch(DbQueryFailError)
export class DatabaseQueryFailFilter implements ExceptionFilter {
	catch(error: Error, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		if (error instanceof DatabaseConstraintFailError) {
			response.status(400).json({
				statusCode: 400,
				message: 'database constraint fail error',
				error: 'Bad Request',
			});

			return;
		}

		response.status(500).json({
			statusCode: 500,
			message: 'unhandled error',
			error: 'Internal Server Error',
		});
	}
}
