import { CART_STATUS } from './../constants/enum';
import { GetCartFilterDto } from './dto/getCartFilter.dto';
import { ERROR } from './../constants/index';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PerfumesRepository } from '../perfume/perfume.repository';
import { CartsRepository } from './cart.repository';
import { CartRequestDto } from './dto/cartRequest.dto';
import { BookingsRepository } from '../booking/booking.repository';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartsRepository)
    private cartsRepository: CartsRepository,

    @InjectRepository(PerfumesRepository)
    private perfumesRepository: PerfumesRepository,

    @InjectRepository(BookingsRepository)
    private bookingsRepository: BookingsRepository,
  ) {}

  async getAll(user, filterDto: GetCartFilterDto) {
    try {
      const { page, limit, sort } = filterDto;
      const pagination = {
        page: +page || 1,
        limit: +limit || 10,
      };

      const skippedItems = (pagination.page - 1) * pagination.limit;

      const query = await this.cartsRepository.findAndCount({
        relations: ['perfume', 'booking'],
        where: {
          status: CART_STATUS.NON_ORDER,
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
      let dt: any = data;
      const totalPrice = dt.reduce((sum, curr, i) => {
        return sum + curr.perfume.price * curr.quatity;
      }, 0);
      return {
        data: data,
        totalPrice,
        pagination: { ...pagination, totalRows },
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async add(user, cartRequest: CartRequestDto) {
    const { perfumeId, quatity } = cartRequest;
    const perfume = await this.perfumesRepository.findOne({ id: perfumeId });
    if (!perfume) throw new NotFoundException(ERROR.PERFUME_NOT_FOUND);

    try {
      let product = await this.cartsRepository.findOne({
        status: CART_STATUS.NON_ORDER,
        user: { id: user.id },
        perfume: {
          id: perfumeId,
        },
      });

      if (product) {
        product.quatity += quatity;
        return await this.cartsRepository.save(product);
      } else {
        const newProduct = {
          quatity,
          perfume,
          user,
        };
        return await this.cartsRepository.save(newProduct);
      }
    } catch (error) {
      throw new InternalServerErrorException(ERROR.ADD_CART_FAIELD);
    }
  }

  async update(user, cartRequest: CartRequestDto) {
    const { perfumeId, quatity, bookingId, status } = cartRequest;

    const perfume = await this.perfumesRepository.findOne({ id: perfumeId });
    if (!perfume) throw new NotFoundException(ERROR.PERFUME_NOT_FOUND);

    try {
      let product = await this.cartsRepository.findOne({
        status: CART_STATUS.NON_ORDER,
        user: { id: user.id },
        perfume: {
          id: perfumeId,
        },
      });

      if (bookingId) {
        let booking = await this.bookingsRepository.findOne({
          id: bookingId,
        });
        product.booking = booking;
      } else product.booking = null;
      product.status = status || product.status;
      product.quatity = quatity;
      if (product.quatity < 1) product.quatity = 1;

      return await this.cartsRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException(ERROR.UPDATE_CART_FAIELD);
    }
  }

  async deleteById(id: string) {
    try {
      return await this.cartsRepository.delete({ id });
    } catch (error) {}
  }
}
