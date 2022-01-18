import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BrandsService } from './brands.service';
import { AddBrandDto } from './dto/addBrand.dto';
import { GetBrandsFilterDto } from './dto/getBrandFilter.dto';
import { UpdateBrandDto } from './dto/updateBrand.dto';

@Controller('brands')
@ApiTags('Brand APIs')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Post()
  addBrand(@Body() brandDto: AddBrandDto) {
    return this.brandsService.addBrand(brandDto);
  }

  @Get()
  GetBrands(@Query() filterDto: GetBrandsFilterDto) {
    return this.brandsService.getBrands(filterDto);
  }

  @Get('/:id')
  getBrandById(@Param('id') id: string) {
    return this.brandsService.getBrandById(id);
  }

  @Patch('/:id')
  @ApiBody({ type: UpdateBrandDto })
  UpdateProfile(@Param('id') id: string, @Body() brandDto: UpdateBrandDto) {
    return this.brandsService.updateBrand(id, brandDto);
  }

  @Delete('/:id')
  deleteBrand(@Param('id') id: string) {
    return this.brandsService.deleteBrand(id);
  }
}