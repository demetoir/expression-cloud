import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { User } from '../model';

const Entity = User;

define(Entity, (faker: typeof Faker) => {
	const entity = new Entity();

	return entity;
});
