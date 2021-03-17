import { lorem, name, random } from 'faker';
import { Expression } from 'src/core/equation/expression/model/expression';

export class ExpressionFactory {
	static build(): Expression {
		const entity = new Expression();
		entity.name = name.findName();
		entity.content = lorem.sentence(20);
		entity.type = random.number(10);
		entity.description = lorem.sentence(20);

		return entity;
	}
}
