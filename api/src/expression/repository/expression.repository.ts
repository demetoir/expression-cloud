import { EntityRepository, Repository } from 'typeorm';
import { Expression } from '../model';

@EntityRepository(Expression)
export class ExpressionRepository extends Repository<Expression> {}
