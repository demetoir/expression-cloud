import { Resolver } from '@nestjs/graphql';
import { Expression } from 'src/expression/model';

@Resolver(() => Expression)
export class ExpressionResolver {}
