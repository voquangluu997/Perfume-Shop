import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfumesRepository } from '../perfume/perfume.repository';
import { CartsRepository } from './cart.repository';
import { BookingsRepository } from '../booking/booking.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartsRepository, PerfumesRepository, BookingsRepository]),
    AuthModule,
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
