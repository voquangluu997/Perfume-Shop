import { Matches, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { VALIDATE_ERROR } from '../../constants';
export class UpdatePasswordDto {
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: VALIDATE_ERROR.PASSWORD_WEAK,
  })
  password: string;

  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: VALIDATE_ERROR.NEW_PASSWORD_WEAK,
  })
  newPassword: string;

  @IsNotEmpty()
  confirmNewPassword: string;
}
