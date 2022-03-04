import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities';
import { CartService } from './cart.service';
import { CartRequestDto } from './dto/cartRequest.dto';
import { GetCartFilterDto } from './dto/getCartFilter.dto';

@Controller('carts')
@ApiTags('Cart APIs')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getAll(@GetUser() user: User, @Query() filterDto: GetCartFilterDto) {
    return this.cartService.getAll(user, filterDto);
  }

  @Post()
  add(@GetUser() user: User, @Body() cartDto: CartRequestDto) {
    return this.cartService.add(user, cartDto);
  }

  @Put()
  update(@GetUser() user: User, @Body() cartDto: CartRequestDto) {
    return this.cartService.update(user, cartDto);
  }


  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.cartService.deleteById(id);
  }

  
}
