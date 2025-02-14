import { Body, Controller, Get, Post, UseInterceptors, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninDto } from "./dto/Signin.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthInterceptor } from "./auth.interceptor";
import { LowercasEmailPipePipe } from "src/pipes/lowercas-email-pipe/lowercas-email-pipe.pipe";


@ApiTags('Auth')

@Controller("auth")
export class AuthsController{
    constructor(private readonly authService: AuthService){

    }
  
    @Post('signup')
    //@UseInterceptors(AuthInterceptor)  // Aplicar el interceptor que convierte el correo a solo minusculas
    @UsePipes(new LowercasEmailPipePipe())  //Modifica el email a minusculas.
    register(@Body() createUserDto: CreateUserDto){
        
        return this.authService.createUser(createUserDto)
    }
   
    @Post('signin')
    signin(@Body() signin: SigninDto){
        //console.log(signin)
        return this.authService.signin(signin)
    }
}