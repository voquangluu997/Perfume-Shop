import { UpdatePerfumeDto } from './dto/updatePerfume.dto';
import { GetPerfumesFilterDto } from './dto/getPerfumesFilter.dto';
import { PerfumesRepository } from './perfume.repository';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand, Fragrance, Perfume } from '../entities';
import { EXCEPTION_MESSAGE, PERFUMES, VALIDATE_ERROR } from '../constants';
import { PerfumeDto } from './dto/addPerfume.dto';
import { getConnection } from 'typeorm';
import { ERROR } from '../constant';

@Injectable()
export class PerfumeService {
  constructor(
    @InjectRepository(PerfumesRepository)
    private perfumesRepository: PerfumesRepository,
  ) {}

  async getPerfumeById(id: string): Promise<Perfume> {
    const perfume = await this.perfumesRepository.findOne({
      where: { id },
      relations: ['brand', 'fragrance'],
    });
    console.log(perfume);
    if (!perfume) {
      throw new NotFoundException(ERROR.PERFUME_NOT_FOUND);
    }
    return perfume;
  }

  async addPerfume(perfumeDto: PerfumeDto) {
    const { name, publishYear, price, about, image, brandId, fragranceId } =
      perfumeDto;

    try {
      var brand = await getConnection()
        .getRepository(Brand)
        .createQueryBuilder('brand')
        .where('brand.id = :brandId', { brandId })
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException(EXCEPTION_MESSAGE.QUERY_FAIL);
    }

    try {
      var fragrance = await getConnection()
        .getRepository(Fragrance)
        .createQueryBuilder('fragrance')
        .where('fragrance.id = :fragranceId', {
          fragranceId,
        })
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException(EXCEPTION_MESSAGE.QUERY_FAIL);
    }

    if (!brand) throw new NotFoundException(EXCEPTION_MESSAGE.BRAND_NOT_FOUND);
    if (!fragrance)
      throw new NotFoundException(EXCEPTION_MESSAGE.FRAGRANCE_NOT_FOUND);

    const perfume = this.perfumesRepository.create({
      name,
      price,
      publishYear,
      about,
      image,
      brand,
      fragrance,
    });

    try {
      return await this.perfumesRepository.save({
        ...perfume,
        brand,
        fragrance,
      });
    } catch (error) {
      console.log(error.message);
      if (error.code == VALIDATE_ERROR.CONFLICT_CODE)
        throw new ConflictException(EXCEPTION_MESSAGE.PERFUME_CONFLICT);
      throw new InternalServerErrorException(
        EXCEPTION_MESSAGE.CREATE_BOOK_FAIL,
      );
    }
  }
  async updatePerfume(
    id: string,
    updatePerfumeDto: UpdatePerfumeDto,
  ): Promise<Perfume> {
    const perfume = await this.getPerfumeById(id);
    const { brandId, fragranceId } = updatePerfumeDto;

    try {
      var brand = await getConnection()
        .getRepository(Brand)
        .createQueryBuilder('brand')
        .where('brand.id = :brandId', {
          brandId,
        })
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException(ERROR.BRAND_NOT_FOUND);
    }

    try {
      var fragrance = await getConnection()
        .getRepository(Fragrance)
        .createQueryBuilder('fragrance')
        .where('fragrance.id = :fragranceId', {
          fragranceId,
        })
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException(ERROR.FRAGRANCE_NOT_FOUND);
    }
    if (!brand) throw new NotFoundException(ERROR.BRAND_NOT_FOUND);
    if (!fragrance) throw new NotFoundException(ERROR.FRAGRANCE_NOT_FOUND);

    return await this.perfumesRepository.save({
      ...perfume,
      ...updatePerfumeDto,
    });
  }

  async deletePerfume(id: string) {
    const perfume = await this.getPerfumeById(id);
    perfume.isDeleted = true;

    return await this.perfumesRepository.save(perfume);
  }

  async getPerfumes(filterDto: GetPerfumesFilterDto) {
    const { search, page, limit, sort } = filterDto;
    const pagination = {
      page: +page || 1,
      limit: +limit || 10,
    };

    const skippedItems = (pagination.page - 1) * pagination.limit;
    const query = this.perfumesRepository
      .createQueryBuilder('perfume')
      .leftJoinAndSelect('perfume.brand', 'brand')
      .leftJoinAndSelect('perfume.fragrance', 'fragrance');
    // .where(`perfume.isDeleted = :isDeleted`, { isDeleted: false });

    if (search) {
      query.andWhere(
        '(LOWER(perfume.name) LIKE LOWER(:search) OR perfume.publishYear LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      let data = await query
        // .orderBy('perfume.name', sort == 'DESC' ? 'DESC' : 'ASC')
        .limit(pagination.limit)
        .offset(skippedItems)
        .getManyAndCount();

      return {
        data: data[0],
        pagination: { ...pagination, totalRows: data[1] },
      };
    } catch (error) {
      throw new InternalServerErrorException(PERFUMES.GET_ALL_FAILED);
    }
  }
}
