import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'orders'
})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    @ManyToOne(() => User, (user) => user.orders, {onDelete: 'CASCADE' })
    user: User

       // Relación 1:N con OrderDetail
       @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, { cascade: true, onDelete: 'CASCADE'  })
       orderDetails: OrderDetail[];


}
