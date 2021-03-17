import { EntityRepository, Repository } from 'typeorm';
import { Vector } from 'src/core/equation/vector/model';

@EntityRepository(Vector)
export class VectorRepository extends Repository<Vector> {}
