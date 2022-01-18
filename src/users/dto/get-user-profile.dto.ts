import { IsEmail, IsOptional, IsString } from 'class-validator';
export class GetUserProfileDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  fullname?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
