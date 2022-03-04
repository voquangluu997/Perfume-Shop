import { CART_STATUS } from './../../constants/enum';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
export class CartRequestDto {
  @IsUUID()
  perfumeId: string;

  @IsNumber()
  quatity: number;

  @IsOptional()
  bookingId?: string;

  @IsOptional()
  status?: CART_STATUS;
}
