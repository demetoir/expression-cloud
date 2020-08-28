import { UserEntity } from '../../../src/user/user/user.entity';
import { IUser } from '../../../src/user/user/user.interface';
import { FAKER_SEED } from '../../constant';
import { internet, lorem, name, seed } from 'faker';

// seed(FAKER_SEED);

export class UserFactory {
	name: string;

	email: string;

	description: string;

	isAnonymous: boolean;

	likedCount: number;

	forkedCount: number;

	static build(): IUser {
		const user = new UserEntity();
		user.name = name.findName();
		user.email = internet.email();
		user.description = lorem.sentence();

		return user;
	}
}
