import { CART_STATUS } from './../constants/enum';
import { ERROR } from './../constants/index';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartsRepository } from '../cart/cart.repository';
import { BookingsRepository } from './booking.repository';
import { BookingRequestDto } from './dto/booking.request.dto';
import { GetBookingFilterDto } from './dto/bookingFilter.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(CartsRepository)
    private cartsRepository: CartsRepository,
    @InjectRepository(BookingsRepository)
    private bookingsRepository: BookingsRepository,
  ) {}

  async getAll(user, filterDto: GetBookingFilterDto) {
    try {
      const { page, limit, sort } = filterDto;
      const pagination = {
        page: +page || 1,
        limit: +limit || 10,
      };

      const skippedItems = (pagination.page - 1) * pagination.limit;

      const query = await this.bookingsRepository.findAndCount({
        relations: ['carts'],
        where: {
          user: {
            id: user.id,
          },
        },
        order: {
          createdAt: sort == 'ASC' ? 'ASC' : 'DESC',
        },
        skip: skippedItems,
        take: limit,
      });

      const [data, totalRows] = query;
      return {
        data: data,
        pagination: { ...pagination, totalRows },
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async getById(user, id: string) {
    try {
      const carts = await this.cartsRepository.find({
        relations: ['perfume'],
        where: {
          booking: {
            id,
          },
          user: {
            id: user.id,
          },
        },
      });

      let booking = await this.bookingsRepository.findOne({
        where: {
          id,
          user: {
            id: user.id,
          },
        },
      });
      return { ...booking, carts };
    } catch (error) {
      console.log(error);
    }
  }

  async add(user, bookingRequest: BookingRequestDto) {
    let { amount, method, address, phone, receiver } = bookingRequest;
    address = address || user.address;

    const carts = await this.cartsRepository.find({
      status: CART_STATUS.NON_ORDER,
    });

    if (carts.length < 1)
      throw new InternalServerErrorException(ERROR.BOOKING_NO_ITEM);

    try {
      const newBooking = {
        address,
        amount,
        method,
        user,
        phone,
        receiver,
      };

      const savedBooking = await this.bookingsRepository.save(newBooking);

      carts.forEach(async (item) => {
        const savedItem = await this.cartsRepository.save({
          ...item,
          status: CART_STATUS.ORDERING,
          booking: savedBooking,
        });
      });

      return savedBooking;
    } catch (error) {
      throw new InternalServerErrorException(ERROR.ADD_BOOKING_FAILED);
    }
  }

  async deleteById(id: string) {
    try {
      return await this.bookingsRepository.delete({ id });
    } catch (error) {}
  }
}
