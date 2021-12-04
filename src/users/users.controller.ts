import { UsersService } from './users.service';
import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags ('User APIs')

export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUser() {
    return this.usersService.getUser();
  }

  @Get('/:id')
  getUserById(id: string) {
    return this.usersService.getUser();
  }

  @Patch()
  UpdateProfile() {
    return this.usersService.getUser();
  }

  @Patch('update-pasword')
  UpdatePassword() {
    return this.usersService.getUser();
  }

  @Delete()
  deleteUser() {
    return this.usersService.getUser();
  }
}
