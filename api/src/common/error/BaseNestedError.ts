export class BaseNestedError extends Error {
	private readonly inner: Error | void;

	constructor(message: string | void, e: Error | void) {
		super();
		this.message = message || '';
		this.inner = e;
	}
}
