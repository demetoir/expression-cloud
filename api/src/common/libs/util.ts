export const isOneOfInstance = (e, ...errorArray): boolean => {
	for (const error of errorArray) {
		if (e instanceof error) {
			return true;
		}
	}

	return false;
};
