import { ExpressionEntity } from './expression.entity';
import { lorem, name, random } from 'faker';

export class ExpressionFactory {
	content: string;
	description: string;
	name: string;
	type: number;
	isForked: boolean;
	forkCount: number;
	likeCount: number;

	static build(): ExpressionEntity {
		const entity = new ExpressionEntity();
		entity.name = name.findName();
		entity.content = lorem.sentence(20);
		entity.type = random.number(10);
		entity.description = lorem.sentence(20);

		return entity;
	}
}
