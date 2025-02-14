import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SeedService } from './seeder.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/users/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';


@ApiTags('Seeder')

@ApiBearerAuth('JWT') // Indica que esta ruta usa el esquema de Bearer Auth


@Controller('seeder')
export class SeedController {
    constructor(private readonly seedService: SeedService) {}
  
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Admin)
    @Post('products')
  @ApiOperation({
    summary: 'Sembrar productos iniciales',
    description: 'Este endpoint siembra datos iniciales de productos en la base de datos. Requiere autenticación.',
  })
  seedProducts() {
     
     return this.seedService.seedData();
  }

  @UseGuards(AuthGuard,RolesGuard)
@Roles(Role.Admin)
  @Post('users')
  @ApiOperation({
    summary: 'Sembrar usuarios iniciales',
    description: 'Este endpoint siembra datos iniciales de usuarios en la base de datos. Requiere autenticación.',
  })
  seedUsers() {
     
     return this.seedService.seedUsers();
  }

 
}
