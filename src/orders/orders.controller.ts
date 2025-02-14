import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/products/products.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/users/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';



@ApiTags('Orders')
@ApiBearerAuth('JWT') // Indica que esta ruta usa el esquema de Bearer Auth
@UseGuards(AuthGuard,RolesGuard)
@Roles(Role.User, Role.Admin)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() request: any) {
    const userId = request.user.id;
    console.log(`ID: ${userId}`)
    return this.ordersService.create(createOrderDto, userId);
  }
/*
  @Get()
  findAll(@Req() request: any) {
    const email = request.user.email; // Correo electrónico del token
    const id = request.user.id;
   console.log(`email: ${email} ID: ${id}`)
    return this.ordersService.findAll();
  }
    */

  @Get('sold')
  getSoldProducts(@Req() request: any): any {
    const id = request.user.id;
    const roles = request.user.roles;

  
   
    return this.ordersService.getSoldProducts(id, roles);
   
  }
/*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
    */
/*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  */
/*
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
*/

}
