import { Perfume} from '@entities/index';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Perfume)
export class PerfumesRepository extends Repository<Perfume> {}
