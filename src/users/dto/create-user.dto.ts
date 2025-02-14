import { IsBoolean, IsEmail, IsEmpty, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "../users.entity";

export class CreateUserDto{
    /**
     * debe es un correo valido y unico en la base de datos
     * @example muqui@hotmail.com
     */
    @IsString()
    @MinLength(1)
    @IsEmail() 
    email: string;

    /**
     * @example Albert
     */
    @IsString()
    @MinLength(4)
    name: string;

    /**
     * @example 123456
     */
    @IsString()
    @MinLength(5)
    password: string;

    /**
     * @example Hidalgo
     */
    @IsString()
    address: string;

    /**
     * @example 36775578
     */
    @IsString()
    phone: string;

    /**
     * @example Zapopan
     */
    @IsString()
    city: string;
    
    /**
     * @example Zapopan
     */
    @IsString()
    country: string;

    /**
     * @example USER
     */ 
   
         // @IsBoolean()  
      // @IsOptional()
    //  @IsString()
    //isAdmin: string; //boolean:


    @IsEnum(UserRole, { message: 'isAdmin must be one of USER, ADMIN, or SUPERADMIN' }) // Validación como enum
    isAdmin: UserRole; // Cambiar el tipo a UserRole


       /**
     * @example 03/06/1985
     */ 
    @IsString()
    birthday: string;


       /**
     * @example 3377552078
     */ 
       @IsString()
       mobil: string;
   


}