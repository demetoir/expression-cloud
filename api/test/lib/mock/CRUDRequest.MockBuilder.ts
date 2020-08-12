import { mock } from 'jest-mock-extended';
import { CrudRequest } from '@nestjsx/crud';

export class CRUDRequestMockBuilder {
	static build(): CrudRequest {
		return mock<CrudRequest>();
	}
}
