import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { CreateOrderDetailDto } from "src/order-details/dto/create-order-detail.dto";

export class CreateOrderDto {
    

 

   // @IsArray()
    //@IsNotEmpty({ each: true })
    //orderDetails: CreateOrderDetailDto[];

    @IsArray()
    @IsNotEmpty({ each: true }) // Asegura que no esté vacío
    @ValidateNested({ each: true }) // Valida que cada detalle sea un CreateOrderDetailDto válido
    @Type(() => CreateOrderDetailDto) // Transforma cada elemento en una instancia de CreateOrderDetailDto
    orderDetails: CreateOrderDetailDto[];
}
