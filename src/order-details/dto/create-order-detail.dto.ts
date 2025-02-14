import { IsArray, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateOrderDetailDto {
    
    @IsNotEmpty()
    @IsNumber()
    @Min(1, { message: 'El precio debe ser mayor o igual a 1.' })
    price: number;
    
    @IsNumber()
    @IsNotEmpty()
    @Min(1, { message: 'La cantidad debe ser igual o mayor a 1' })
    amount: number;
  
    @IsNumber()
    @IsNotEmpty()
    productId: number; // Cambiar a un solo productId en lugar de una lista de productos


    
}
