export class DBQueryFailError extends Error {
	private inner: Error;

	constructor(inner: Error) {
		super();
		this.inner = inner;
	}
}
