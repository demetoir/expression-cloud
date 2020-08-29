import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseConstraintFailError } from '../error/database-constraint-fail.error';
import { DBQueryFailError } from '../error/DB-query-fail.error';

@Catch(DBQueryFailError)
export class DatabaseQueryFailFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		if (exception instanceof DatabaseConstraintFailError) {
			response.status(400).json({
				statusCode: 400,
				message: 'database constraint fail error',
				error: 'Bad Request',
			});

			return;
		} else {
			response.status(500).json({
				statusCode: 500,
				message: exception.message,
			});
		}
	}
}
