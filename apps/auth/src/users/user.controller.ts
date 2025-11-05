import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UserService } from './user.service';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }
}
