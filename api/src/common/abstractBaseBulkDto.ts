import { NotImplementedException } from '@nestjs/common';
import { CreateManyDto } from '@nestjsx/crud';
import { AbstractBaseDto } from './abstractBaseDto';

export class AbstractBaseBulkDto {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-module-boundary-types
	public static fromBody(body: any): CreateManyDto<AbstractBaseDto> {
		throw new NotImplementedException();
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public toEntity() {
		throw new NotImplementedException();
	}
}
