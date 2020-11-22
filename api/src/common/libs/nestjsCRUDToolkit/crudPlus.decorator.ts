import { CrudOptions } from '@nestjsx/crud/lib/interfaces';
import * as _ from 'lodash';
import { Crud } from '@nestjsx/crud';
import {
	ApiCreateManyResponse,
	ApiCreateOneResponse,
	ApiDeleteOneResponse,
	ApiReadManyResponse,
	ApiReadOneResponse,
	ApiReplaceOneResponse,
	ApiUpdateOneResponse,
} from './index';

export const CrudPlus = (options: CrudOptions) => {
	const { type } = options.model;

	const decoratorOptions = {
		routes: {
			getManyBase: {
				decorators: [ApiReadManyResponse({ type })],
			},
			getOneBase: {
				decorators: [ApiReadOneResponse({ type })],
			},
			createManyBase: {
				decorators: [ApiCreateManyResponse({ type })],
			},
			createOneBase: {
				decorators: [ApiCreateOneResponse({ type })],
			},
			replaceOneBase: {
				decorators: [ApiReplaceOneResponse({ type })],
			},
			updateOneBase: {
				decorators: [ApiUpdateOneResponse({ type })],
			},
			deleteOneBase: {
				decorators: [ApiDeleteOneResponse()],
			},
		},
	};
	const newOption: CrudOptions = _.merge(options, decoratorOptions);

	return Crud(newOption);
};
