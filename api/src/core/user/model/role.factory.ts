import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Role } from './role';
import { RoleName } from './role-name.enum';

define(Role, (faker: typeof Faker) => {
	const entity = new Role();

	entity.name = faker.random.arrayElement(Object.values(RoleName));

	return entity;
});
