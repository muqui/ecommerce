import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { Product } from 'src/products/products.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>
  ){}

  async create(createOrderDto: CreateOrderDto,   userId: number) {
    const {  orderDetails } = createOrderDto;

    // Validar que todos los productos existen
    const productIds = orderDetails.map(detail => detail.productId);
    const products = await this.productRepository.findByIds(productIds);

    if (products.length !== productIds.length) {
      const missingIds = productIds.filter(
        id => !products.some(product => product.id === id)
      );
      throw new NotFoundException(
        `Productos no encontrados: ${missingIds.join(', ')}`
      );
    }

    // Validar que hay suficiente stock para cada producto
    for (const detail of orderDetails) {
      const product = products.find(p => p.id === detail.productId);
      if (product.stock < detail.amount) {
        throw new BadRequestException(
          `El producto con ID ${product.id} no tiene suficiente stock. Stock disponible: ${product.stock}, solicitado: ${detail.amount}`
        );
      }
    }

    // Crear la orden
    const order = new Order();
    order.user = { id: userId } as any; // Asume que solo necesitas el id del usuario
    order.orderDetails = await Promise.all(
      orderDetails.map(async detailDto => {
        const orderDetail = new OrderDetail();
        orderDetail.price = detailDto.price;
        orderDetail.amount = detailDto.amount;
        orderDetail.product = products.find(p => p.id === detailDto.productId);
        return orderDetail;
      })
    );

    // Guardar la orden
    const savedOrder = await this.orderRepository.save(order);

    // Actualizar el stock de los productos
    for (const detail of orderDetails) {
      const product = products.find(p => p.id === detail.productId);
      product.stock -= detail.amount;
      await this.productRepository.save(product);
    }

    return savedOrder;
  }

    // Método para obtener productos vendidos
    async getSoldProducts(userId: any, roles: any): Promise<any[]> {
      
      console.log(`USER ID dentro del servicio: ${userId}, roles: ${roles}`);
  
      // Crear el queryBuilder para obtener órdenes
      const query = this.orderRepository.createQueryBuilder('order')
        .innerJoinAndSelect('order.orderDetails', 'orderDetail')
        .innerJoinAndSelect('orderDetail.product', 'product') // Corregir a product
        .innerJoinAndSelect('order.user', 'user')
        .select([
          'order.id',
          'order.date',
          'user.id',
          'orderDetail.id',
          'orderDetail.price',
          'orderDetail.amount', // Incluye amount en la selección
          'product.id',
          'product.name',
          'product.description',
          'product.barcode',
          'product.price',
          'product.stock',
          'product.imgUrl',
          'product.categoryId',
        ]);
    
      // Filtrar solo si el rol es 'User'
      if (roles.includes('user')) {
        query.where('user.id = :userId', { userId });
      }
    
      // Ejecutar y devolver los resultados
      return query.getMany();


    } 
 

   
  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
