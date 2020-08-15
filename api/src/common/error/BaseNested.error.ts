export class baseNestedError extends Error {
	private readonly inner: Error | void;

	constructor(message: string, e: Error | void) {
		super(message);
		this.inner = e;
	}
}
