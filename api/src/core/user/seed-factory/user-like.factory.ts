import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { UserLike } from '../model';

const Entity = UserLike;

define(Entity, (faker: typeof Faker) => {
	const entity = new Entity();

	return entity;
});
