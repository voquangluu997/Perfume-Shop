import { AuthModule } from './../auth/auth.module';
import { PerfumesRepository } from './perfume.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PerfumeController } from './perfume.controller';
import { PerfumeService } from './perfume.service';

@Module({
  imports: [TypeOrmModule.forFeature([PerfumesRepository]), AuthModule],
  controllers: [PerfumeController],
  providers: [PerfumeService],
})
export class PerfumeModule {}
