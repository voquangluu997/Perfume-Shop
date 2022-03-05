import {
  TIME_ADMIN,
  ORDER_ADMIN,
  BOOKING_STATUS,
} from './../../constants/enum';
import { CART_STATUS } from '../../constants/enum';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetFilterAdminDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({
    required: false,
    type: Number,
    description: 'get from page..',
    minimum: 1,
    default: 1,
  })
  page?: number;

  @IsOptional()
  time?: TIME_ADMIN;

  @IsOptional()
  order?: ORDER_ADMIN;

  @IsOptional()
  status?: BOOKING_STATUS;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({
    required: false,
    type: Number,
    description: 'limit record per page',
    minimum: 1,
    default: 10,
  })
  limit?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'sort by name : DESC/ASC',
  })
  sort?: string;
}
