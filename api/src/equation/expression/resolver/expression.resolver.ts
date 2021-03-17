import { Resolver } from '@nestjs/graphql';
import { Expression } from 'src/equation/expression/model';

@Resolver(() => Expression)
export class ExpressionResolver {}
