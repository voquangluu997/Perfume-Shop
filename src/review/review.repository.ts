import { Review } from './review.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {}
