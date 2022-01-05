import { IsOptional } from 'class-validator';

export class UpdateFragranceDto {
  @IsOptional()
  name: string;
}
