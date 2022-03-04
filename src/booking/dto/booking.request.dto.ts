import { BOOKING_STATUS, PAYMENT_METHOD } from './../../constants/enum';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
export class BookingRequestDto {
  @IsString()
  method: PAYMENT_METHOD;

  @IsNumber()
  amount: number;

  @IsOptional()
  address?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  receiver?: string;

  @IsOptional()
  status?: BOOKING_STATUS;
}
