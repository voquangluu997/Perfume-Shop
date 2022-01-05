import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsRepository } from './brand.repository';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandsRepository])],

  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
