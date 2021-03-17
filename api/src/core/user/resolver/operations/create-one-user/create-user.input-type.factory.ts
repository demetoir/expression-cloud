import { CreateUserInputType } from './create-user.input-type';

export class CreateUserInputTypeFactory {
	static build(): CreateUserInputType {
		const inputType = new CreateUserInputType();

		return inputType;
	}
}
