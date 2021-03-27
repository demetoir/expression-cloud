import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Role } from '../model';
import { RoleName } from '../model/role-name.enum';

define(Role, (faker: typeof Faker) => {
	const entity = new Role();

	entity.name = faker.random.arrayElement(Object.values(RoleName));

	return entity;
});
