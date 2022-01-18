import { Fragrance } from './fragrance.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Fragrance)
export class FragrancesRepository extends Repository<Fragrance> {}
