import { Resolver } from '@nestjs/graphql';
import { Expression } from 'src/core/equation/expression/model';

@Resolver(() => Expression)
export class ExpressionResolver {}
