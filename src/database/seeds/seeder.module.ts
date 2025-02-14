import { Module } from '@nestjs/common';
import { ProductsModule } from "src/products/products.module";
import { SeedService } from './seeder.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { SeedController } from './seeder.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [ProductsModule, CategoriesModule, UsersModule],
    controllers: [SeedController],
    providers: [SeedService], 
  })
  export class DatabaseModule {}