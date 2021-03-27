import { define } from 'typeorm-seeding';
import Faker, { internet, lorem, name, random } from 'faker';
import { User } from './user';

export class UserFactory {
	static build(): User {
		const user = new User();
		user.name = name.findName();
		user.email = internet.email() + random.number(10000000);
		user.description = lorem.sentence();

		return user;
	}
}

const Entity = User;

define(Entity, (faker: typeof Faker) => {
	const entity = new Entity();

	entity.name = faker.name.findName();
	entity.email = faker.internet.email() + random.number(10000000);
	entity.description = faker.lorem.sentence();

	return entity;
});
