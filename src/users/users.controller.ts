import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './user.entity';

@Controller('users')
@ApiTags('User APIs')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUser(@GetUser() user: User) {
    return this.usersService.getUser(user);
  }

  // @Get('/:id')
  // getUserById(id: string) {
  //   return this.usersService.getUser();
  // }

  // @Patch()
  // UpdateProfile() {
  //   return this.usersService.getUser();
  // }

  // @Patch('update-pasword')
  // UpdatePassword() {
  //   return this.usersService.getUser();
  // }

  @Delete()
  deleteUser() {
    // return this.usersService.getUser();
  }
}
