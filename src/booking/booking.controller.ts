import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities';
import { BookingService } from './booking.service';
import { BookingRequestDto } from './dto/booking.request.dto';
import { GetFilterAdminDto } from './dto/bookingAdminFilter.dto';
import { GetBookingFilterDto } from './dto/bookingFilter.dto';
import { PaymentDto } from './dto/payment.dto';
import { Request } from '@nestjs/common';
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

  @Get('/ad')
  getAdmin(@GetUser() user: User, @Query() filterDto: GetFilterAdminDto) {
    return this.bookingService.getAdmin(user, filterDto);
  }
  @Patch('/ad/:id')
  updateAdmin(
    @GetUser() user: User,
    @Param('id') id: string,
    @Query() filterDto: GetFilterAdminDto,
  ) {
    return this.bookingService.approveOrder(user, id, filterDto);
  }

  @Get('/:id')
  getById(@GetUser() user: User, @Param('id') id: string) {
    return this.bookingService.getById(user, id);
  }

  @Post()
  add(@GetUser() user: User, @Body() bookingDto: BookingRequestDto) {
    return this.bookingService.add(user, bookingDto);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.bookingService.deleteById(id);
  }

  @Post('/create-payment-url')
  createPayment(@Body() paymentDto: PaymentDto, @Request() request) {
    var ipAddr =
      request.headers['x-forwarded-for'] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      request.connection.socket.remoteAddress;
    return this.bookingService.createPayment(paymentDto, ipAddr);
  }
}
