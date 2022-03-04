import { ERROR } from './../constants/index';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewRequestDto } from './dto/review-request.dto';
import { ReviewRepository } from './review.repository';
import { PerfumesRepository } from '../perfume/perfume.repository';
import { GetReviewsFilterDto } from './dto/get-review-filter.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
    @InjectRepository(PerfumesRepository)
    private perfumesRepository: PerfumesRepository,
  ) {}

  async addReview(user, addReviewDto: ReviewRequestDto) {
    const { rating, comment, perfumeId } = addReviewDto;
    if (!user) throw new NotFoundException(ERROR.USER_NOT_FOUND);
    const perfume = await this.perfumesRepository.findOne({ id: perfumeId });
    if (!perfume) throw new NotFoundException(ERROR.PERFUME_NOT_FOUND);

    if (!rating && !comment) {
      throw new BadRequestException(ERROR.REVIEW_IS_EMPTY);
    }
    const found = await this.reviewRepository.findOne({
      relations: ['user', 'perfume'],
      where: {
        user: {
          id: user.id,
        },
        perfume: {
          id: perfumeId,
        },
      },
    });

    if (found) throw new ConflictException(ERROR.ALREADY_REVIEW);

    const newReview = { rating, comment, user, perfume };

    try {
      return this.reviewRepository.save(newReview);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getReviews(filterDto: GetReviewsFilterDto, perfumeId) {
    const { page, limit, sort } = filterDto;
    const pagination = {
      page: +page || 1,
      limit: +limit || 10,
    };

    const skippedItems = (pagination.page - 1) * pagination.limit;
    try {
      const query = await this.reviewRepository.findAndCount({
        relations: ['user'],
        where: {
          perfume: {
            id: perfumeId,
          },
        },
        order: {
          createdAt: sort == 'ASC' ? 'ASC' : 'DESC',
        },
        skip: skippedItems,
        take: limit,
      });
      let [listReviews, count] = query;
      let [one, two, three, four, five] = [0, 0, 0, 0, 0];
      const ratingAvg = listReviews.reduce((ini, curr) => {
        switch (curr.rating) {
          case 1:
            one++;
            break;
          case 2:
            two++;
            break;
          case 3:
            three++;
            break;
          case 4:
            four++;
            break;
          default:
            five++;
        }
        return ini + curr.rating;
      }, 0);

      return {
        data: {
          items: listReviews,
          perfumeId,
          ratingAvg:
            listReviews.length > 0
              ? (ratingAvg / listReviews.length).toFixed(1)
              : 0,
          one,
          two,
          three,
          four,
          five,
        },
        pagination: { ...pagination, totalRows: count },
      };
    } catch (error) {
      throw new InternalServerErrorException(ERROR.REVIEW_GET_ALL_FAILED);
    }
  }
}
