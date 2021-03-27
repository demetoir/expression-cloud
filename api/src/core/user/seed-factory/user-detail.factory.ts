import { define } from 'typeorm-seeding';
import Faker, { random } from 'faker';
import { UserDetail } from '../model/user-detail';

const Entity = UserDetail;

define(Entity, (faker: typeof Faker) => {
	const entity = new Entity();

	entity.name = faker.name.findName();
	entity.email = faker.internet.email() + random.number(10000000);
	entity.description = faker.lorem.sentence();

	return entity;
});
