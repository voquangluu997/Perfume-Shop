import {
  CART_STATUS,
  TIME_ADMIN,
  ORDER_ADMIN,
  BOOKING_STATUS,
} from './../constants/enum';
import { ERROR, PERFUMES } from './../constants/index';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartsRepository } from '../cart/cart.repository';
import { BookingsRepository } from './booking.repository';
import { BookingRequestDto } from './dto/booking.request.dto';
import { GetBookingFilterDto } from './dto/bookingFilter.dto';
import { GetFilterAdminDto } from './dto/bookingAdminFilter.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(CartsRepository)
    private cartsRepository: CartsRepository,
    @InjectRepository(BookingsRepository)
    private bookingsRepository: BookingsRepository,
  ) {}

  async approveOrder(user, bookingId, filter) {
    if (user.id != 'd52b499a-d3e7-40d4-9059-70304fb1ea21')
      throw new UnauthorizedException('not admin');

    try {
      const carts = await this.cartsRepository.find({
        relations: ['perfume'],
        where: {
          booking: {
            id: bookingId,
          },
        },
      });

      let booking = await this.bookingsRepository.findOne({
        relations: ['user'],
        where: {
          id: bookingId,
        },
      });
      await this.bookingsRepository.save({
        ...booking,
        status: BOOKING_STATUS.ORDERED,
      });
      return await this.getAdmin(user, filter);
    } catch (error) {
      console.log(error);
    }
  }

  async getAdmin(user, filter: GetFilterAdminDto) {
    if (user.id != 'd52b499a-d3e7-40d4-9059-70304fb1ea21')
      throw new UnauthorizedException('not admin');
    const { page, limit, sort, order, time, status } = filter;
    const pagination = {
      page: +page || 1,
      limit: +limit || 10,
    };
    const skippedItems = (pagination.page - 1) * pagination.limit;

    const today = new Date();
    today.setDate(today.getDate() - 1);
    let w = new Date(today);
    w.setDate(w.getDate() - 8);
    let m = new Date(today);
    m.setDate(m.getDate() - 31);
    let y = new Date(today);
    y.setDate(m.getDate() - 366);

    const query = this.bookingsRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.carts', 'cart')
      .leftJoinAndSelect('booking.user', 'user');

    if (time == TIME_ADMIN.M) {
      query.andWhere(`booking.createdAt >= :m`, {
        m,
      });
    }
    if (time == TIME_ADMIN.W) {
      query.andWhere(`booking.createdAt >= :w`, {
        w,
      });
    }
    if (time == TIME_ADMIN.D) {
      query.andWhere(`booking.createdAt >= :today`, {
        today,
      });
    }
    if (time == TIME_ADMIN.Y) {
      query.andWhere(`booking.createdAt >= :y`, {
        y,
      });
    }

    if (status) {
      query.andWhere(`booking.status = :status`, {
        status,
      });
    }

    try {
      query.limit(pagination.limit).offset(skippedItems);
      if (order == ORDER_ADMIN.TIME) {
        query.orderBy('booking.createdAt', sort == 'DESC' ? 'DESC' : 'ASC');
      }
      let data = await query.getManyAndCount();

      return {
        data: data[0],
        pagination: { ...pagination, totalRows: data[1] },
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(PERFUMES.GET_ALL_FAILED);
    }
  }

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
