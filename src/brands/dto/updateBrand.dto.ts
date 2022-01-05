import { IsOptional } from 'class-validator';

export class UpdateBrandDto {
  @IsOptional()
  name?: string;
}
