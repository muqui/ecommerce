import { Order } from "src/orders/entities/order.entity";
import { BeforeInsert, Column, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { v4 as uuidv4 } from 'uuid';

// Definir el enum para los roles
export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN',
}

@Entity({
    name: 'users'
})
export class User{
  
    @PrimaryGeneratedColumn()
    id: string;
   
    @Column({ unique: true })
    email: string;
    @Column()
    name: string;
    @Column()
    password: string;
    @Column()
    address: string;
    @Column()
    phone: string;
    @Column()
    country: string;
    @Column()
    city: string;
   // @Column() //@Column({default: false})
   // isAdmin: string;    //original isAdmin: boolean; 

   @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER, // Valor predeterminado
})
isAdmin: UserRole;

    @Column()
    birthday: string;


    @Column({nullable: true})   //cambio para migracion
    mobil: string;
   
    
    
    @OneToMany(() => Order, (order) => order.user, {cascade: true,  onDelete: 'CASCADE'})
    orders: Order[]


   // orders_id: Relación 1:N con orders.
}