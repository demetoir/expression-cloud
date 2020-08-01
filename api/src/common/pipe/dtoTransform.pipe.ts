import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AbstractBaseDto } from '../abstractBaseDto';

@Injectable()
export class DTOTransformPipe implements PipeTransform {
	constructor(readonly DTOClass: typeof AbstractBaseDto) {
		if (DTOClass.fromBody === undefined) {
			throw new TypeError('DtoClass must have "fromBody" method');
		}
	}

	transform(value: any, metadata: ArgumentMetadata): AbstractBaseDto {
		if (metadata.type === 'body') {
			return this.DTOClass.fromBody(value);
		}

		return value;
	}
}
