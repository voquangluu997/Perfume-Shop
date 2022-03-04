import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities';
import { BookingService } from './booking.service';
import { BookingRequestDto } from './dto/booking.request.dto';
import { GetBookingFilterDto } from './dto/bookingFilter.dto';

@Controller('bookings')
@ApiTags('Booking APIs')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get()
  getAll(@GetUser() user: User, @Query() filterDto: GetBookingFilterDto) {
    return this.bookingService.getAll(user, filterDto);
  }

  @Get('/:id')
  getById(@GetUser()user: User,  @Param('id') id: string) {
    return this.bookingService.getById(user,id);
  }

  @Post()
  add(@GetUser() user: User, @Body() bookingDto: BookingRequestDto) {
    return this.bookingService.add(user, bookingDto);
  }

  //   @Put()
  //   update(@GetUser() user: User, @Body() cartDto: BookingRequestDto) {
  //     return this.cartService.update(user, cartDto);
  //   }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.bookingService.deleteById(id);
  }
}
