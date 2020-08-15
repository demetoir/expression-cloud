import { ValidationError } from 'class-validator';

export class BaseNestedError extends Error {
	private readonly inner: any;

	constructor(
		message: string | void,
		e: Error | Error[] | ValidationError[] | void,
	) {
		super(message || '');
		this.inner = e;
	}
}
