import { TokenParser } from './tokenPraser';
import { TokenPainter } from './tokenPainter';
import { FormatBuilder } from './FormatBuilder.js';
import { createRotateLogStream } from './createRotateLogStream';

import * as morgan from 'morgan';
// todo add test
// todo add jsdoc
// todo add types define
/**
 *
 * @param format
 * @param option
 * @returns {e.RequestHandler | *}
 */
function morganToolkit(format: any, option: any): any {
	return morgan(format, option);
}

export {
	morganToolkit,
	TokenParser,
	TokenPainter,
	FormatBuilder,
	createRotateLogStream,
};
