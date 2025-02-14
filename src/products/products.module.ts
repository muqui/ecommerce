import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductsRepository } from "./products.repository";
import { Product } from "./products.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloudinaryConfig } from "src/config/cloudinary";
import { CloudinaryService } from "src/users/cloudinary.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers:[ProductsService, ProductsRepository, CloudinaryConfig, CloudinaryService],
    controllers: [ProductsController],
    exports:[TypeOrmModule, ProductsService]
})

export class ProductsModule{}