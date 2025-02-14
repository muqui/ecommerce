import { Category } from "src/categories/entities/category.entity";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'products'
})
export class Product{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string;
    @Column()
    description: string;
    @Column({unique: true})
    barcode: string;
    @Column()
    price: number;
    @Column()
    stock: number;
    @Column()
    imgUrl: string;
    @Column()
    categoryId : number
  
   @ManyToOne(() => Category, (category) => category.Products)
   category: Category


       // Relación 1:N con OrderDetail
       @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
       orderDetails: OrderDetail[];

}