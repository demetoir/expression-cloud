import { UpdateUserInputType } from './update-user.input-type';

export class UpdateUserInputTypeFactory {
	static build(): UpdateUserInputType {
		const inputType = new UpdateUserInputType();

		return inputType;
	}
}
