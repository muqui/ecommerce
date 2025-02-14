import { IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
     /**
     * Debe ser un correo valido
     * @example Celulares
     */
    @IsString()
    @MinLength(1)
    name: string;
}
