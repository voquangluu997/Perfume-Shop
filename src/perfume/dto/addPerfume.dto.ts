import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class PerfumeDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  publishYear: string;

  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsOptional()
  about: string;

  origin: string;

  @IsNotEmpty()
  @IsOptional()
  image: string;

  @IsNotEmpty()
  @IsOptional()

  sex: string;

  @IsNotEmpty()
  @IsOptional()
  brandId: string;

  @IsNotEmpty()
  @IsOptional()
  fragranceId: string;
}
