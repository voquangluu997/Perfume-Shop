import { AddBrandDto } from './dto/addBrand.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandsRepository } from './brand.repository';
import { ERROR } from '../constant';
import { Brand } from './brand.entity';
import { GetBrandsFilterDto } from './dto/getBrandFilter.dto';
import { UpdateBrandDto } from './dto/updateBrand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandsRepository)
    private brandsRepository: BrandsRepository,
  ) {}

  async addBrand(brandDto: AddBrandDto) {
    const { name } = brandDto;
    const newBrand = this.brandsRepository.create({
      name,
    });

    try {
      return await this.brandsRepository.save(newBrand);
    } catch (error) {
      throw new InternalServerErrorException(ERROR.ADD_BRAND_ERROR);
    }
  }

  async getBrandById(id: string): Promise<Brand> {
    const brand = await this.brandsRepository.findOne({
      id,
    });
    if (!brand) {
      throw new NotFoundException(ERROR.BRAND_NOT_FOUND);
    }
    return brand;
  }

  async updateBrand(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<Brand> {
    const brand = await this.getBrandById(id);
    return await this.brandsRepository.save({
      ...brand,
      ...updateBrandDto,
    });
  }

  async deleteBrand(id: string) {
    const brand = await this.getBrandById(id);
    brand.isDeleted = true;
    return await this.brandsRepository.save(brand);
  }

  async getBrands(filterDto: GetBrandsFilterDto) {
    const { search, page, limit, sort } = filterDto;
    const pagination = {
      page: +page || 1,
      limit: +limit || 10,
    };

    const skippedItems = (pagination.page - 1) * pagination.limit;
    const query = this.brandsRepository
      .createQueryBuilder('brand')
      .where(`brand.isDeleted = :isDeleted`, { isDeleted: false });

    if (search) {
      query.andWhere('(LOWER(brand.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
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
      throw new InternalServerErrorException(ERROR.GET_BRANDS_FAILED);
    }
  }
}
