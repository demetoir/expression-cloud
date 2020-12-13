import { User } from 'src/user/model/user.entity';
import { internet, lorem, name, random } from 'faker';

export class UserFactory {
	static build(): User {
		const user = new User();
		user.name = name.findName();
		user.email = internet.email() + random.number(10000000);
		user.description = lorem.sentence();

		return user;
	}
}
