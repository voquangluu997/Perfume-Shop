import { AddBrandDto } from './dto/addBrand.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandsRepository } from './brand.repository';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandsRepository)
    private perfumesRepository: BrandsRepository,
  ) {}

  async addBrand(brandDto: AddBrandDto) {
    const { name } = brandDto;
    const newBrand = this.perfumesRepository.create({
      name,
    });

    try {
      return await this.perfumesRepository.save(newBrand);
    } catch (error) {
      console.log(error.message);
    }
  }
}
