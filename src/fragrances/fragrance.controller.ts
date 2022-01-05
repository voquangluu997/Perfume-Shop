import { ApiBody, ApiTags } from '@nestjs/swagger';
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
import { AddFragranceDto } from './dto/addFragrance.dto';
import { FragrancesService } from './fragrance.service';
import { UpdateFragranceDto } from './dto/updateFragrance.dto';
import { GetFragrancesFilterDto } from './dto/getFragranceFilter.dto';

@Controller('fragrances')
@ApiTags('Fragrance APIs')
export class FragrancesController {
  constructor(private fragrancesService: FragrancesService) {}

  @Post()
  addFragrance(@Body() fragranceDto: AddFragranceDto) {
    return this.fragrancesService.addFragrance(fragranceDto);
  }

  @Get()
  GetPerfumes(@Query() filterDto: GetFragrancesFilterDto) {
    return this.fragrancesService.getFragrances(filterDto);
  }

  @Get('/:id')
  getFragranceById(@Param('id') id: string) {
    return this.fragrancesService.getFragranceById(id);
  }

  @Patch('/:id')
  @ApiBody({ type: UpdateFragranceDto })
  UpdateProfile(
    @Param('id') id: string,
    @Body() fragranceDto: UpdateFragranceDto,
  ) {
    return this.fragrancesService.updateFragrance(id, fragranceDto);
  }

  @Delete('/:id')
  deleteFragrance(@Param('id') id: string) {
    return this.fragrancesService.deleteFragrance(id);
  }
}
