import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class CreateUserDto extends AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  fullname?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;
  
}
