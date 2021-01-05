export const isOneOfInstance = (e, ...errors: Error[]): boolean => {
	for (const error: Error of errors) {
		if (e instanceof error) {
			return true;
		}
	}

	return false;
};
