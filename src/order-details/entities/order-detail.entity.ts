import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/products/products.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'order_details'
})
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    amount : number;

      // Relación N:1 con Order
      @ManyToOne(() => Order, (order) => order.orderDetails, {onDelete: 'CASCADE' })
      @JoinColumn()
      order: Order;

    // Relación N:N con products

   // @ManyToMany(() => Product)  // Agregar cascade
   // @JoinTable()
   // products: Product[];

        // Relación N:1 con Product
        @ManyToOne(() => Product, (product) => product.orderDetails)
        @JoinColumn()
        product: Product;



}
