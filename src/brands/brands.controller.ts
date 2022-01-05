import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { AddBrandDto } from './dto/addBrand.dto';

@Controller('brands')
@ApiTags('Brand APIs')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Post()
  addBrand(@Body() brandDto: AddBrandDto) {
    return this.brandsService.addBrand(brandDto);
  }
}
