import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsRepository } from '../cart/cart.repository';
import { BookingController } from './booking.controller';
import { BookingsRepository } from './booking.repository';
import { BookingService } from './booking.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartsRepository, BookingsRepository]),
    AuthModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
