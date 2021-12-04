import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { PerfumeService } from './perfume.service';

@Controller('perfume')
@ApiTags ('Perfume APIs')
export class PerfumeController {
  constructor(private perfumesService: PerfumeService) {}

  @Get()
  getUser() {
    return this.perfumesService.getPerfume();
  }

  @Get('/:id')
  getPerfumeById(id: string) {
    return this.perfumesService.getPerfume();
  }

  @Patch()
  UpdateProfile() {
    return this.perfumesService.getPerfume();
  }

  @Delete()
  deletePerfume() {
    return this.perfumesService.getPerfume();
  }
}
