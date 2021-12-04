import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PerfumeController } from './perfume.controller';
import { PerfumeService } from './perfume.service';

@Module({
  // imports: TypeOrmModule.forFeature({Per})
  controllers: [PerfumeController],
  providers: [PerfumeService]
})
export class PerfumeModule {}
