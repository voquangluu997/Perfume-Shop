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

    try {
      const found = await this.reviewRepository.findOne({
        relations: ['user'],
        where: {
          user: {
            id: user.id,
          },
        },
      });

      if (found) throw new ConflictException(ERROR.ALREADY_REVIEW);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    const newReview = { rating, comment, user, perfume };

    try {
      return this.reviewRepository.save(newReview);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
