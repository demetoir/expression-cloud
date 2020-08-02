import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AbstractBaseDto } from '../abstractBaseDto';
import { CreateManyDto } from '@nestjsx/crud';
import { AbstractBaseBulkDto } from '../abstractBaseBulkDto';

@Injectable()
export class BulkDtoTransformPipe implements PipeTransform {
	constructor(readonly DTOClass: typeof AbstractBaseBulkDto) {
		if (DTOClass.fromBody === undefined) {
			throw new TypeError('DtoClass must have "fromBody" method');
		}
	}

	transform(
		value: any,
		metadata: ArgumentMetadata,
	): CreateManyDto<AbstractBaseDto> {
		if (metadata.type === 'body') {
			return this.DTOClass.fromBody(value);
		}

		return value;
	}
}
