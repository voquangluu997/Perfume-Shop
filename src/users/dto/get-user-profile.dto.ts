import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
export class GetUserProfileDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  fullname?: string;

  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
