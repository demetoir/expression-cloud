import { name, random } from 'faker';
import { Vector } from 'src/vector/model/vector';

export class VectorFactory {
	static build(): Vector {
		const entity = new Vector();
		entity.name = name.findName();
		entity.index = random.number(100);

		return entity;
	}
}
