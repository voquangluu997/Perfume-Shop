import { ERROR } from './../constant/index';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddFragranceDto } from './dto/addFragrance.dto';
import { Fragrance } from './fragrance.entity';
import { FragrancesRepository } from './fragrance.repository';
import { UpdateFragranceDto } from './dto/updateFragrance.dto';
import { GetFragrancesFilterDto } from './dto/getFragranceFilter.dto';

@Injectable()
export class FragrancesService {
  constructor(
    @InjectRepository(FragrancesRepository)
    private fragrancesRepository: FragrancesRepository,
  ) {}

  async addFragrance(brandDto: AddFragranceDto) {
    const { name } = brandDto;
    const newFragrance = this.fragrancesRepository.create({
      name,
    });

    try {
      return await this.fragrancesRepository.save(newFragrance);
    } catch (error) {
      throw new InternalServerErrorException(ERROR.ADD_FRAGRANCE_ERROR);
    }
  }

  async getFragranceById(id: string): Promise<Fragrance> {
    const fragrance = await this.fragrancesRepository.findOne({
      id,
    });
    if (!fragrance) {
      throw new NotFoundException(ERROR.FRAGRANCE_NOT_FOUND);
    }
    return fragrance;
  }

  async updateFragrance(
    id: string,
    updateFragranceDto: UpdateFragranceDto,
  ): Promise<Fragrance> {
    const fragrance = await this.getFragranceById(id);
    return await this.fragrancesRepository.save({
      ...fragrance,
      ...updateFragranceDto,
    });
  }

  async deleteFragrance(id: string) {
    const fragrance = await this.getFragranceById(id);
    fragrance.isDeleted = true;
    return await this.fragrancesRepository.save(fragrance);
  }

  async getFragrances(filterDto: GetFragrancesFilterDto) {
    const { search, page, limit, sort } = filterDto;
    const pagination = {
      page: +page || 1,
      limit: +limit || 10,
    };

    const skippedItems = (pagination.page - 1) * pagination.limit;
    const query = this.fragrancesRepository
      .createQueryBuilder('fragrance')
      .where(`fragrance.isDeleted = :isDeleted`, { isDeleted: false });

    if (search) {
      query.andWhere(
        '(LOWER(fragrance.name) LIKE LOWER(:search) OR fragrance.publishYear LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      let data = await query
        .limit(pagination.limit)
        .offset(skippedItems)
        .getManyAndCount();

      return {
        data: data[0],
        pagination: { ...pagination, totalRows: data[1] },
      };
    } catch (error) {
      throw new InternalServerErrorException(ERROR.GET_FRAGRANCES_FAILED);
    }
  }
}
