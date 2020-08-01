import { NotImplementedException } from '@nestjs/common';

export class AbstractBaseDto {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-module-boundary-types
	public static fromBody(body: any) {
		throw new NotImplementedException();
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public toEntity() {
		throw new NotImplementedException();
	}
}
