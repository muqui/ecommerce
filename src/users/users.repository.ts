import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { SigninDto } from "src/auth/dto/Signin.dto";

@Injectable()
export class UsersRepository{
   

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    private users = [
        {
            id: 1,
            email: 'title 1',
            name: 'description 1',
            password: '123456',
            address: 'calle',
            phone: '2344664309',
            country: 'Mexico',
            city: 'Guadalajara'
        },
        {
            id: 2,
            email: 'email@corona.net',
            name: 'description 2',
            password: '123456',
            address: 'calle',
            phone: '2344664309',
            country: 'Mexico',
            city: 'Guadalajara'
        },
        {
            id: 3,
            email: 'title 3',
            name: 'description 3',
            password: '123456',
            address: 'calle',
            phone: '2344664309',
            country: 'Mexico',
            city: 'Zapopan'
        }
       
    ]

    async getUsers(){
        return this.userRepository.find();
    }

    async saveUser(createUserDto: CreateUserDto) {
        try {
            const userFound = await this.userRepository.findOne({
                where: {
                    email: createUserDto.email,
                },
            });
    
            if (userFound) {
                throw new HttpException('User already exists', HttpStatus.CONFLICT);
            }
    
            // Intentar guardar el usuario
            const savedUser = await this.userRepository.save(createUserDto);
    
            // Verificar si el usuario se guardó correctamente
            if (!savedUser) {
                throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
            }
    
            return `User created ${createUserDto.email} successfully`;
        } catch (error) {
            // Manejar cualquier error durante la operación
            console.error('Error saving user:', error);
            throw new HttpException(
                error.message || 'An error occurred while creating the user',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    
    
   /* findOneByEmail({email, password}: SigninDto){
        return this.userRepository.findOneBy({email})
      }*/
      findOneByEmail(email: string){
        return this.userRepository.findOneBy({email})
      }   

      async deleteUSer(id: string) {
            // Buscar el producto por ID
    const product = await this.userRepository.findOne({ where: { id } });

    // Si el producto no existe, enviar un mensaje personalizado
    if (!product) {
      throw new NotFoundException(`El producto con el ID ${id} no existe`);
    }

    // Si el producto existe, eliminarlo
    await this.userRepository.delete(id);
  }
    
}