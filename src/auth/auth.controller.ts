import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
@ApiBearerAuth('access-token')
@ApiTags('Auth APIs')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.login(authCredentialsDto);
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
  
}
