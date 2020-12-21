import { EntityRepository, Repository } from 'typeorm';
import { Vector } from 'src/vector/model';

@EntityRepository(Vector)
export class VectorRepository extends Repository<Vector> {}
