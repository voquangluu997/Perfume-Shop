import { RATING } from './../../constants/enum';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewRequestDto {
  @IsOptional()
  @ApiProperty({ required: false })
  rating?: RATING;

  @IsOptional()
  @ApiProperty({ required: false })
  comment?: string;

  @IsUUID()
  @ApiProperty({ required: true })
  perfumeId: string;
}
