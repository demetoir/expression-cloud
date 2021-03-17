import { Resolver } from '@nestjs/graphql';
import { Vector } from 'src/core/equation/vector/model';

@Resolver(() => Vector)
export class VectorResolver {}
