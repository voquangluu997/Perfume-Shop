import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class UpdatePerfumeDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  publishYear?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  price?: number;

  @IsOptional()
  about?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  sex?: string;

  @IsOptional()
  status: string;

  @IsOptional()
  brandId?: string;

  @IsOptional()
  fragranceId?: string;
}
