export class DbQueryFailError extends Error {
	private inner: Error;

	constructor(inner: Error) {
		super();
		this.inner = inner;
	}
}
