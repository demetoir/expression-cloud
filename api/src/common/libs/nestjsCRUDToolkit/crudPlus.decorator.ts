import { CrudOptions } from '@nestjsx/crud/lib/interfaces';
import {
	ApiCreateManyResponse,
	ApiCreateOneResponse,
	ApiDeleteOneResponse,
	ApiReadManyResponse,
	ApiReadOneResponse,
	ApiReplaceOneResponse,
	ApiUpdateOneResponse,
} from './index';
import * as _ from 'lodash';
import { Crud } from '@nestjsx/crud';

export const CrudPlus = (options: CrudOptions) => {
	const type = options.model.type;

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
