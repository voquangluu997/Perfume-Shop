import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AddFragranceDto } from './dto/addFragrance.dto';
import { FragrancesService } from './fragrance.service';
import { GetPerfumesFilterDto } from '../perfume/dto/getPerfumesFilter.dto';

@Controller('fragrances')
@ApiTags('Fragrance APIs')
export class FragrancesController {
  constructor(private fragrancesService: FragrancesService) {}

  @Post()
  addFragrance(@Body() brandDto: AddFragranceDto) {
    return this.fragrancesService.addFragrance(brandDto);
  }

  @Get()
  GetPerfumes(@Query() filterDto: GetPerfumesFilterDto) {
    return this.fragrancesService.getFragrances(filterDto);
  }

  @Get('/:id')
  getFragranceById(@Param('id') id: string) {
    return this.fragrancesService.getFragranceById(id);
  }

  // @Patch('/:id')
  // @ApiBody({ type: UpdatePerfumeDto })
  // UpdateProfile(@Param('id') id: string, perfumeDto: UpdatePerfumeDto) {
  //   return this.perfumesService.updatePerfume(id, perfumeDto);
  // }

  // @Delete('/:id')
  // deletePerfume(@Param('id') id: string) {
  //   return this.perfumesService.deletePerfume(id);
  // }
}
