import { EntityRepository, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { VALIDATE_ERROR } from '../constants';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, fullname, phone,address } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      email,
      password: hashPassword,
      fullname,
      phone,
      address
    });

    try {
      return await this.save(user);
    } catch (err) {
      if (err.code === VALIDATE_ERROR.EXISTS_EMAIL_CODE) {
        throw new ConflictException(VALIDATE_ERROR.EMAIL_CONFLICT);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
