import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './users/schemas/user.schema';

export const getCurrentUserByContext = (
  context: ExecutionContext,
): User | undefined => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest()?.user as User | undefined;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData()?.user as User | undefined;
  }
  return undefined;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User | undefined => {
    return getCurrentUserByContext(context);
  },
);
