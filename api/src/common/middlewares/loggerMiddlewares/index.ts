import { FileStreamAll } from './FileStreamAll';
import { FileStreamOnlyNoneStaticRequest } from './FileStreamOnlyNoneStaticRequest';
import { FileStreamOnlyError } from './FileStreamOnlyError';
import { StdOut } from './StdOut';

/**
 *
 * @returns {e.RequestHandler|*[]}
 * @constructor
 */
const CustomMorgan = function () {
	return [
		StdOut,
		FileStreamOnlyError,
		FileStreamOnlyNoneStaticRequest,
		FileStreamAll,
	];
};

export { CustomMorgan };
