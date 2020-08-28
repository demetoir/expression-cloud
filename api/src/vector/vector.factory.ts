import { VectorEntity } from './vector.entity';
import { name, random } from 'faker';

export class VectorFactory {
	static build(): VectorEntity {
		const entity = new VectorEntity();
		entity.name = name.findName();
		entity.index = random.number(100);

		return entity;
	}
}
