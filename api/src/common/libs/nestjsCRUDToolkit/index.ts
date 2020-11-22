export * from './apiPropertyOption.interface';

export { ApiCreateOneResponse } from './apiCRUDResponseDecorator/apiCreateOneResponse.decorator';
export { ApiCreateManyResponse } from './apiCRUDResponseDecorator/apiCreateManyResponse.decorator';
export { ApiReadOneResponse } from './apiCRUDResponseDecorator/apiReadOneReponse.decorator';
export { ApiReadManyResponse } from './apiCRUDResponseDecorator/apiReadManyResponse.decorator';
export { ApiReplaceOneResponse } from './apiCRUDResponseDecorator/apiReplaceOneReponse.decorator';
export { ApiUpdateOneResponse } from './apiCRUDResponseDecorator/apiUpdateOneReponse.decorator';
export { ApiDeleteOneResponse } from './apiCRUDResponseDecorator/apiDeleteOneResponse.decorator';

export {
	ApiCRUDOption,
	ApiCRUDDecorator,
	GetManyResponse,
} from './apiPropertyOption.interface';

export { CrudPlus } from './crudPlus.decorator';

export { ApiAddTag } from './openApi/ApiAddTag';

export { documentBuilderSingleton } from './openApi/documentBuilder.singleton';
