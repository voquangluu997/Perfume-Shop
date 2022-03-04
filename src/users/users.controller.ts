import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './user.entity';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

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
  @Patch()
  updateUser(
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @GetUser() user: User,
  ) {
    return this.usersService.updateUserProfile(updateUserProfileDto, user);
  }

  // @Patch('/update-password')
  // updatePassword(
  //   @Body() updatePasswordDto: UpdatePasswordDto,
  //   @GetUser() user: User,
  // ): Promise<{ message: string }> {
  //   return this.userService.updatePassword(updatePasswordDto, user);
  // }
}
