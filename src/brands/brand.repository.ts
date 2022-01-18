import { Brand} from '@entities/index';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Brand)
export class BrandsRepository extends Repository<Brand> {}
