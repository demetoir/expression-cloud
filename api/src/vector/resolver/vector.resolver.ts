import { Resolver } from '@nestjs/graphql';
import { Vector } from 'src/vector/model';

@Resolver(() => Vector)
export class VectorResolver {}
