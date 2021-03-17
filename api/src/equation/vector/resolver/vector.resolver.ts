import { Resolver } from '@nestjs/graphql';
import { Vector } from 'src/equation/vector/model';

@Resolver(() => Vector)
export class VectorResolver {}
