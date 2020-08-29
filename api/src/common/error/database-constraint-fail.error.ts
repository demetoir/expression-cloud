import { DBQueryFailError } from './DB-query-fail.error';

export class DatabaseConstraintFailError extends DBQueryFailError {
	constructor(inner: Error) {
		super(inner);
	}
}
