import { AuthGuard } from '@nestjs/passport';
import { UpdatePerfumeDto } from './dto/updatePerfume.dto';
import { GetPerfumesFilterDto } from './dto/getPerfumesFilter.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
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
import { PerfumeService } from './perfume.service';
import { PerfumeDto } from './dto/addPerfume.dto';

@Controller('perfumes')
@ApiTags('Perfume APIs')
@ApiBearerAuth('access-token')
export class PerfumeController {
  constructor(private perfumesService: PerfumeService) {}

  @Post()
  @ApiBody({ type: PerfumeDto })
  addPerfume(@Body() addPerfumeDto: PerfumeDto) {
    return this.perfumesService.addPerfume(addPerfumeDto);
  }

  @Get()
  GetPerfumes(@Query() filterDto: GetPerfumesFilterDto) {
    return this.perfumesService.getPerfumes(filterDto);
  }

  @Get('/:id')
  getPerfumeById(@Param('id') id: string) {
    return this.perfumesService.getPerfumeById(id);
  }

  @Patch('/:id')
  @ApiBody({ type: UpdatePerfumeDto })
  UpdateProfile(@Param('id') id: string, @Body() perfumeDto: UpdatePerfumeDto) {
    return this.perfumesService.updatePerfume(id, perfumeDto);
  }

  @Delete('/:id')
  deletePerfume(@Param('id') id: string) {
    return this.perfumesService.deletePerfume(id);
  }

  // @Get("/admin")
  // GetPerfumesAdmin( @GetUser() user :User, @Query() filterDto: GetPerfumesFilterAdminDto) {
  //   return this.perfumesService.getPerfumes(filterDto);
  // }


}
