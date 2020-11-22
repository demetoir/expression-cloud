import { lorem, name, random } from 'faker';
import { ExpressionEntity } from './expression.entity';

export class ExpressionFactory {
	static build(): ExpressionEntity {
		const entity = new ExpressionEntity();
		entity.name = name.findName();
		entity.content = lorem.sentence(20);
		entity.type = random.number(10);
		entity.description = lorem.sentence(20);

		return entity;
	}
}
