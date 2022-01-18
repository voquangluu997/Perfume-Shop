import { Module } from '@nestjs/common';
import { FragrancesService } from './fragrance.service';
import { FragrancesController } from './fragrance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FragrancesRepository } from './fragrance.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FragrancesRepository])],
  providers: [FragrancesService],
  controllers: [FragrancesController],
})
export class FragranceModule {}
