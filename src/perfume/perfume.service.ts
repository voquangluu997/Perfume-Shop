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
import { ERROR } from '../constants';

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
    if (!perfume) {
      throw new NotFoundException(ERROR.PERFUME_NOT_FOUND);
    }
    return perfume;
  }

  async addPerfume(perfumeDto: PerfumeDto) {
    const {
      name,
      price,
      about,
      publishYear,
      image,
      brandId,
      fragranceId,
      sex,
      origin,
    } = perfumeDto;

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
      origin,
      image,
      brand,
      fragrance,
      sex,
    });

    try {
      return await this.perfumesRepository.save({
        ...perfume,
        brand,
        fragrance,
      });
    } catch (error) {
      if (error.code == VALIDATE_ERROR.CONFLICT_CODE)
        throw new ConflictException(EXCEPTION_MESSAGE.PERFUME_CONFLICT);
      throw new InternalServerErrorException(
        EXCEPTION_MESSAGE.CREATE_PERFUME_FAIL,
      );
    }
  }
  async updatePerfume(
    id: string,
    updatePerfumeDto: UpdatePerfumeDto,
  ): Promise<Perfume> {
    const perfume = await this.getPerfumeById(id);
    let brandId = perfume.brand.id,
      fragranceId = perfume.fragrance.id;

    if (updatePerfumeDto.brandId) brandId = updatePerfumeDto.brandId;
    if (updatePerfumeDto.fragranceId)
      fragranceId = updatePerfumeDto.fragranceId;

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
    const { search, page, limit, sort, brand, fragrance, order } = filterDto;
    const pagination = {
      page: +page || 1,
      limit: +limit || 10,
    };

    const skippedItems = (pagination.page - 1) * pagination.limit;
    const query = this.perfumesRepository
      .createQueryBuilder('perfume')
      .leftJoinAndSelect('perfume.brand', 'brand')
      .leftJoinAndSelect('perfume.fragrance', 'fragrance')
      .leftJoinAndSelect('perfume.review', 'review');
    if (search) {
      query.andWhere(
        '(LOWER(perfume.name) LIKE LOWER(:search) OR LOWER(perfume.sex) LIKE LOWER(:search) OR  perfume.publishYear LIKE :search OR LOWER(brand.name) LIKE LOWER(:search) OR LOWER(fragrance.name) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    if (brand) {
      query.andWhere(`LOWER(brand.name) LIKE LOWER(:brand)`, {
        brand: `%${brand}%`,
      });
    }

    if (fragrance) {
      query.andWhere(`LOWER(fragrance.name) LIKE LOWER(:fragrance)`, {
        fragrance: `%${fragrance}%`,
      });
    }

    try {
      let data = await query
        // .orderBy('perfume.name', sort == 'DESC' ? 'DESC' : 'ASC')
        .limit(pagination.limit)
        .offset(skippedItems)
        .getManyAndCount();
      const dt: any = data[0];

      let ratingAvg = dt.map((item) => {
        return {
          total: item.review.length,
          avg: item?.review.reduce((tol, curr) => {
            return tol + curr.rating;
          }, 0),
        };
      });
      ratingAvg = ratingAvg.map((item) => {
        return {
          total: item.total,
          ratingAvg: item.total > 0 ? (item.avg / item.total).toFixed(1) : 0,
        };
      });

      return {
        data: data[0],
        reviews: ratingAvg,
        pagination: { ...pagination, totalRows: data[1] },
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(PERFUMES.GET_ALL_FAILED);
    }
  }
}
