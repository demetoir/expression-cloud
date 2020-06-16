const stdOut = require('./StdOut.js');
const fileStreamAll = require('./FileStreamAll.js');
const fileStreamOnlyError = require('./FileStreamOnlyError.js');
const fileStreamOnlyNoneStaticRequest = require('./FileStreamOnlyNoneStaticRequest.js');

/**
 *
 * @returns {e.RequestHandler|*[]}
 * @constructor
 */
const CustomMorgan = function () {
	return [stdOut(), fileStreamAll(), fileStreamOnlyError(), fileStreamOnlyNoneStaticRequest()];
};

module.exports = CustomMorgan;
