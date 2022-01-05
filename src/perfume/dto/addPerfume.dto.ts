import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class PerfumeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  publishYear: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsOptional()
  about: string;

  @IsNotEmpty()
  @IsOptional()
  image: string;

  @IsNotEmpty()
  sex: string;

  @IsNotEmpty()
  brandId: string;

  @IsNotEmpty()
  fragranceId: string;
}
