import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./create-product.dto";
import { CloudinaryService } from "src/users/cloudinary.service";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsRepository{
    

    private products = [
        {
            id: 1,
            name: 'product 1',
            description : 'description',
            price : 2.50,
            stock : true,
            imgUrl: 'imagenUrl'
            
        },
        {
            id: 2,
            name: 'product 2',
            description : 'description 2',
            price : 2.50,
            stock : true,
            imgUrl: 'imagenUr2'
            
        },
        {
            id: 3,
            name: 'product 3',
            description : 'description 3',
            price : 2.50,
            stock : true,
            imgUrl: 'imagenUrl3'
            
        }
       
    ]

    constructor(
        @InjectRepository(Product) private readonly productRepository : Repository<Product>,
                                   private readonly cloudinaryService: CloudinaryService
    ){}

    async getProducts(){
        //return this.products;

        return this.productRepository.find()
    }

   async createProduct(createProductDto: CreateProductDto) {
        // valida si en producto existe
        const existingProduct = await this.productRepository.findOne({
            where: [
                { barcode: createProductDto.barcode }, // Verificar por código de barras
            ],
        });

         // Si el producto ya existe, lanzar una excepción
         if (existingProduct) {
            throw new HttpException(
                'El producto código de barras ya existe.',
                HttpStatus.BAD_REQUEST,
            );
        }

        return this.productRepository.save(createProductDto)
    }

    async getProduct(id: number) {
        const productFound = await this.productRepository.findOne({  // busca si el usuario existe.
            where: {
                id
            }
        })
        if(!productFound){
            return new HttpException('Product not Found', HttpStatus.NOT_FOUND)
        }
        return productFound;
    }

    async uploadImage(id: number, file: Express.Multer.File) {

      //  return  this.cloudinaryService.upladImage(file);
        
        const productFound = await this.productRepository.findOne({  // busca si el usuario existe.
            where: {
                id
            }
        })
        if(!productFound){
            return  new HttpException('Product not Found', HttpStatus.NOT_FOUND)
        }

        const saveFile = await this.cloudinaryService.upladImage(file);
         // Actualizar el producto con la URL de la imagen subida
         productFound.imgUrl = saveFile.secure_url; // Asumiendo que saveFile.secure_url contiene la URL de la imagen

         // Guardar los cambios en la base de datos
         await this.productRepository.save(productFound);
        console.log(saveFile)
        return {
            message: 'Imagen subida y producto actualizado',
            product: productFound
        };
    }
    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id } });

        if (!product) {
            throw new NotFoundException(`El producto con ID ${id} no existe`);
        }
    
        Object.assign(product, updateProductDto);
    
        return this.productRepository.save(product);
    }
   
   
}