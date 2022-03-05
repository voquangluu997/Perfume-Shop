import { TIME_ADMIN } from './../../constants/enum';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetPerfumesFilterDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'get time',
  })
  time?: TIME_ADMIN;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  order?: string;

  @IsOptional()
  @IsString()
  fragrance?: string;

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
