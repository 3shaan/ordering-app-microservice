import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    // console.log('User:', req.user);
    return this.ordersService.create(request, req.cookies?.Authentication);
  }

  @Get()
  getAllOrders() {
    return this.ordersService.getAll();
  }
}
