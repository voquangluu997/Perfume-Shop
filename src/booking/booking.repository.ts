import { Booking } from './booking.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Booking)
export class BookingsRepository extends Repository<Booking> {}
