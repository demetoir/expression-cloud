export const isOneOfInstance = (e, ...errors: Error[]): boolean =>
	errors.some((error: any) => e instanceof error);
