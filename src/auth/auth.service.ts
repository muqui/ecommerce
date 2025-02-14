import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { SigninDto } from "./dto/Signin.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from "src/users/roles.enum";
import { UserRole } from "src/users/users.entity";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }
    getAuth() {
        return "Get all auths";
    }
    async signin({ email, password }: SigninDto) {
        const user = await this.userService.findOneByEmail(email)

        //console.log(user);

        if (!user) {
            throw new UnauthorizedException('email or password incorrect')
        }

        const isPasswordValided = await bcrypt.compare(password, user.password)

        if (!isPasswordValided) {
            throw new UnauthorizedException('email or password  is wrong')
        }

        const payLoad = {
            email: user.email,
            id: user.id,
            // roles: [user.isAdmin? Role.Admin : Role.User]
            /*
            roles: [
                user.isAdmin === 'admin'
                    ? Role.Admin
                    : user.isAdmin === 'superadmin'
                        ? Role.SuperAdmin
                        : Role.User
            ],
            */
            roles: [
                user.isAdmin === UserRole.ADMIN
                    ? Role.Admin
                    : user.isAdmin === UserRole.SUPERADMIN
                        ? Role.SuperAdmin
                        : Role.User
            ],
        }

        console.log('Payload antes de firmar el token:', payLoad);  // Verifica que el payload está correcto
        const token = await this.jwtService.signAsync(payLoad);
        return { token, email };


    }

    async createUser(createUserDto: CreateUserDto) {
        const user = await this.userService.findOneByEmail(createUserDto.email)
        if (user) {
            throw new BadRequestException('User already exists')
        }
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
        console.log(await bcrypt.hash(createUserDto.password, 10))
        return this.userService.createUser(createUserDto);
    }
}