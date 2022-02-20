import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { ReviewRequestDto } from './dto/review-request.dto';
import { ReviewService } from './review.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities';

@Controller('reviews')
@ApiTags('Review APIs')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @ApiBody({ type: ReviewRequestDto })
  addReivew(@GetUser() user: User, @Body() addReviewDto: ReviewRequestDto) {
    return this.reviewService.addReview(user, addReviewDto);
  }
}
