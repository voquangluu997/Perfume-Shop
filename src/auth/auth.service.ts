import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async login(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Email or password is incorrect');
    }
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(createUserDto);
  }

  async googleLogin(req) {
    let user = req.user;
    let res, ggUser;

    if (!user) {
      throw new NotFoundException('No user from google');
    }

    let { email, phone, fullname, address } = user;

    try {
      const found = await this.usersRepository.findOne({
        email,
      });

      if (found) {
        ggUser = this.usersRepository.create({
          email,
          fullname: found.fullname,
          phone,
          address,
        });

        const payload: JwtPayload = { email };
        const accessToken: string = await this.jwtService.sign(payload);

        res = { user: ggUser, accessToken };
      } else {
        const defaultPassword = email;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(defaultPassword, salt);

        ggUser = {
          email,
          phone,
          fullname,
          address,
        };

        try {
          await this.usersRepository.save({
            ...ggUser,
            ...{ password: hashPassword },
          });

          const payload: JwtPayload = { email };
          const accessToken: string = await this.jwtService.sign(payload);
          res = { user: ggUser, accessToken };
        } catch (err) {
          throw new InternalServerErrorException(
            'Create accout from FB failed',
          );
        }
      }
    } catch (error) {
      throw new InternalServerErrorException('Query google user failed');
    }

    var responseHTML =
      '<html><head><title>Main</title></head><body></body><script>let res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>';
    responseHTML = responseHTML.replace(
      '%value%',
      JSON.stringify({
        userInfo: res,
      }),
    );
    return responseHTML;
  }
}
