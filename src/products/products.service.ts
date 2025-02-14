import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { CreateProductDto } from "./create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService{
   
   
   
    constructor (private productsRepository: ProductsRepository){}
    getProducts(){
        return this.productsRepository.getProducts();
    }

    createProduct(createProductDto : CreateProductDto) {
        return this.productsRepository.createProduct(createProductDto)
    }

    async geProduct(id: number) {
       return this.productsRepository.getProduct(id)
    }
   
    uploadImage(id: number, file: Express.Multer.File) {
        return this.productsRepository.uploadImage(id, file);
    }

    updateProduct(id: number, updateProductDto: UpdateProductDto){
        return this.productsRepository.updateProduct( id, updateProductDto);
    }
}