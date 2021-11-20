import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class CreateUserDto extends AuthCredentialsDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  fullname?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
