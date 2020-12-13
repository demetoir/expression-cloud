import { GetManyUserInputType } from './get-many-user.input-type';

export class GetManyUserInputTypeFactory {
	static build(): GetManyUserInputType {
		const inputType = new GetManyUserInputType();

		return inputType;
	}
}
