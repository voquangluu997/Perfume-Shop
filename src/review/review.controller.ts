import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { ReviewRequestDto } from './dto/review-request.dto';
import { ReviewService } from './review.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities';
import { ReviewResponseDto } from './dto/review-response.dto';
import { GetReviewsFilterDto } from './dto/get-review-filter.dto';

@Controller('reviews')
@ApiTags('Review APIs')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth('access-token')
  @ApiBody({ type: ReviewRequestDto })
  addReivew(@GetUser() user: User, @Body() addReviewDto: ReviewRequestDto) {
    return this.reviewService.addReview(user, addReviewDto);
  }

  @Get('/:id')
  getReivews(
    @Query() filterDto: GetReviewsFilterDto,
    @Param('id') perfumeId: string,
  ) {
    return this.reviewService.getReviews(filterDto, perfumeId);
  }
}
