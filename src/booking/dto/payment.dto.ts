import {
  TIME_ADMIN,
  ORDER_ADMIN,
  BOOKING_STATUS,
} from './../../constants/enum';
import { CART_STATUS } from '../../constants/enum';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @IsNumber()
  amount?: number;

  @IsOptional()
  bankCode?: string;

  @IsOptional()
  orderInfo?: string;

  @IsOptional()
  orderType?: string;

  @IsOptional()
  language?: string;
}
