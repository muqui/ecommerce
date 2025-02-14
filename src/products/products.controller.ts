import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Role } from "src/users/roles.enum";
import { Roles } from "src/decorators/roles.decorator";
import { UpdateProductDto } from "./dto/update-product.dto";


@ApiTags('Products')
@ApiBearerAuth('JWT') // Indica que esta ruta usa el esquema de Bearer Auth
//@UseGuards(AuthGuard,RolesGuard) //indica que todo el controlador es privado.
//@Roles(Role.User)
@Controller("products")
//@UseGuards(AuthGuard)
export class ProductsController{
    constructor (private readonly productsService: ProductsService){

    }
  
    @Get()
    getProducts(){
        return this.productsService.getProducts();
    }
    @Get(':id')
    getProduct(@Param('id', ParseIntPipe) id: number){

        return this.productsService.geProduct(id);
    }
    @Post()
    createProduct(@Body() createProductDto : CreateProductDto){
        return this.productsService.createProduct(createProductDto);
    }

    @UseGuards(AuthGuard,RolesGuard) //indica que todo el controlador es privado.
    @Roles(Role.User)
    @Patch('files/uploadImage/:id')
    @UseInterceptors(FileInterceptor('image'))
    @ApiOperation({ summary: 'Subir una imagen de producto' })
    @ApiConsumes('multipart/form-data') // Indica que este endpoint acepta datos multipart, como archivos
    @ApiResponse({ status: 200, description: 'Imagen subida correctamente.' })
    @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
    uploadImage(@Param('id',ParseIntPipe) id:number, @UploadedFile() file : Express.Multer.File){
        return this.productsService.uploadImage(id,file);
    }
    
    @UseGuards(AuthGuard,RolesGuard) //indica que todo el controlador es privado.
    @Roles(Role.User)
    @Put(':id')
    updateProduct(
        @Param('id') id: number,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productsService.updateProduct(id, updateProductDto);
    }
}