import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUser(user: User): Promise<GetUserProfileDto> {
    const { id, fullname, email, phone, address } = user;
    let userInfo: GetUserProfileDto = {
      id,
      fullname,
      email,
      phone,
      address,
    };
    return userInfo;
  }
}
