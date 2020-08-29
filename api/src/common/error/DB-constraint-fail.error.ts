import { DBQueryFailError } from './DB-query-fail.error';

export class DBConstraintFailError extends DBQueryFailError {
	constructor(inner: Error) {
		super(inner);
	}
}
