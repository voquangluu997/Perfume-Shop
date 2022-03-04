import { RATING } from './../../constants/enum';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewResponseDto {
  rating: RATING;
  comment: string;
  perfumeId: string;
  ratingAvg: number;
  
}
