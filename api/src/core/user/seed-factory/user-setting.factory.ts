import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { UserSetting } from '../model';

const Entity = UserSetting;

define(Entity, (faker: typeof Faker) => {
	const entity = new Entity();

	return entity;
});
