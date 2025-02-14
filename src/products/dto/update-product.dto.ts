import { IsOptional, IsString, IsNumber, IsUrl } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    barcode?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsNumber()
    stock?: number;

    @IsOptional()
    @IsUrl()
    imgUrl?: string;

    @IsOptional()
    @IsNumber()
    categoryId?: number;
}
