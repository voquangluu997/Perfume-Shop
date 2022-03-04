import { ERROR } from './../constants/index';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
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

  async updateUserProfile(
    updateUserProfileDto: UpdateUserProfileDto,
    user: User,
  ) {
    const { fullname, phone, address } = updateUserProfileDto;

    user.fullname = fullname || user.fullname;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(ERROR.UPDATE_FAILED);
    }
  }

  // async updatePassword(
  //   updatePasswordDto: UpdatePasswordDto,
  //   user: User,
  // ): Promise<{ message: string }> {
  //   const { password, newPassword, confirmNewPassword } = updatePasswordDto;
  //   if (await bcrypt.compare(password, user.password)) {
  //     if (newPassword === confirmNewPassword) {
  //       const salt = await bcrypt.genSalt();
  //       const hashPassword = await bcrypt.hash(newPassword, salt);
  //       user.password = hashPassword;
  //       await this.userRepository.save(user);
  //       return { message: SUCCESS_MESSAGE.PASSWORD_CONFIRM_SUCCESSFULY };
  //     } else
  //       throw new InternalServerErrorException(
  //         VALIDATE_ERROR.CONFIRM_PASSWORD_FAILED,
  //       );
  //   } else
  //     throw new InternalServerErrorException(VALIDATE_ERROR.PASSWORD_INCORRECT);
  // }
}
