//https://www.xataka.com/analisis/mejores-moviles-2022-analisis-videos

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/products.entity';
import { User, UserRole } from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
//export class SeedService implements OnModuleInit { // OnModuleInit se ejecuta al iniciar la app.
export class SeedService  {
 
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

 // async onModuleInit() {
 //   await this.seedData();
 // }

   async seedData() {
    // Verificar si ya existen datos en la base de datos
    const existingCategories = await this.categoryRepository.count();
    if (existingCategories > 0) {
      console.log('Data already seeded');
      return 'Data already seeded';
    }

    // Datos de ejemplo para categorías y productos
    const data = [
      {
        category: { name: 'Celulares'},
        products : [
          {
            name: 'Samsung Galaxy S24 Ultra',
            description: 'El Samsung Galaxy S24 Ultra destaca por su excelente rendimiento gracias al procesador Qualcomm Snapdragon 8 Gen 3, una pantalla AMOLED de 6.8 pulgadas de alta calidad y una cámara principal de 200 megapíxeles.',
            barcode: '123456789001',
            price: 145900,
            stock: 15,
            imgUrl: 'https://via.placeholder.com/150?text=Samsung+Galaxy+S24+Ultra',
          },
          {
            name: 'OPPO Find X8 Pro 5G',
            description: 'El OPPO Find X8 Pro 5G es reconocido por su excepcional calidad fotográfica, con cuatro cámaras traseras de 50 megapíxeles cada una, y un diseño elegante que lo posiciona entre los mejores smartphones del mercado.',
            barcode: '123456789002',
            price: 139999,
            stock: 10,
            imgUrl: 'https://via.placeholder.com/150?text=OPPO+Find+X8+Pro+5G',
          },
          {
            name: 'Google Pixel 9 Pro',
            description: 'El Google Pixel 9 Pro ofrece un diseño mejorado, funciones avanzadas de cámara con herramientas de edición de fotos, y una pantalla de 6.3 pulgadas con alta resolución, todo impulsado por el procesador Google Tensor G4.',
            barcode: '123456789003',
            price: 120000,
            stock: 20,
            imgUrl: 'https://via.placeholder.com/150?text=Google+Pixel+9+Pro',
          },
          {
            name: 'iPhone 16 Pro Max',
            description: 'El iPhone 16 Pro Max cuenta con el potente procesador Apple A18 Pro, una pantalla OLED de 6.9 pulgadas de alta calidad, y un sistema de cámaras avanzado que incluye una lente principal de 48 megapíxeles.',
            barcode: '123456789004',
            price: 146900,
            stock: 25,
            imgUrl: 'https://via.placeholder.com/150?text=iPhone+16+Pro+Max',
          },
          {
            name: 'realme GT 7 Pro',
            description: 'El realme GT 7 Pro destaca por su rendimiento excepcional gracias al procesador Qualcomm Snapdragon 8 Elite, una batería de 6500 mAh con carga ultrarrápida de 120W, y una pantalla de alta calidad con brillo máximo de 6500 nits.',
            barcode: '123456789005',
            price: 99999,
            stock: 30,
            imgUrl: 'https://via.placeholder.com/150?text=realme+GT+7+Pro',
          },
          {
            name: 'Xiaomi 14 Ultra',
            description: 'El Xiaomi 14 Ultra ofrece una cámara excepcional, un diseño premium y un rendimiento de alta gama, posicionándose como una opción destacada en el mercado de smartphones.',
            barcode: '123456789006',
            price: 121099,
            stock: 18,
            imgUrl: 'https://via.placeholder.com/150?text=Xiaomi+14+Ultra',
          },
          {
            name: 'Motorola Edge 50 Pro',
            description: 'El Motorola Edge 50 Pro combina un diseño atractivo con un rendimiento sólido, ofreciendo una experiencia de usuario equilibrada en el segmento de gama alta.',
            barcode: '123456789007',
            price: 51300,
            stock: 22,
            imgUrl: 'https://via.placeholder.com/150?text=Motorola+Edge+50+Pro',
          },
          {
            name: 'OnePlus 12',
            description: 'El OnePlus 12 impresiona con su rendimiento excepcional, pantalla brillante y carga ultrarrápida, consolidándose como una opción sólida en el mercado de smartphones Android.',
            barcode: '123456789008',
            price: 85000,
            stock: 28,
            imgUrl: 'https://via.placeholder.com/150?text=OnePlus+12',
          },
          {
            name: 'Huawei Pura 70 Ultra',
            description: 'El Huawei Pura 70 Ultra se destaca por su excelente cámara y diseño innovador, ofreciendo una experiencia fotográfica de alta calidad.',
            barcode: '123456789009',
            price: 139900,
            stock: 12,
            imgUrl: 'https://via.placeholder.com/150?text=Huawei+Pura+70+Ultra',
          },
          {
            name: 'Honor 200 Pro',
            description: 'El Honor 200 Pro ofrece una duración de batería excepcional y carga rápida de 100W, junto con un diseño atractivo y rendimiento sólido.',
            barcode: '123456789010',
            price: 79900,
            stock: 35,
            imgUrl: 'https://via.placeholder.com/150?text=Honor+200+Pro',
          },
          {
            name: 'Samsung Galaxy A55 5G',
            description: 'El Samsung Galaxy A55 5G es un móvil equilibrado con buen rendimiento, pantalla de calidad y conectividad 5G, ideal para usuarios que buscan una experiencia completa a un precio accesible.',
            barcode: '123456789011',
            price: 32341,
            stock: 50,
            imgUrl: 'https://via.placeholder.com/150?text=Samsung+Galaxy+A55+5G',
          },
          {
            name: 'realme 12 Pro+ 5G',
            description: 'El realme 12 Pro+ 5G ofrece una excelente autonomía y carga rápida, junto con un rendimiento sólido y una pantalla de alta calidad, posicionándose como una opción atractiva en la gama media.',
            barcode: '123456789012',
            price: 37999,
            stock: 40,
            imgUrl: 'https://via.placeholder.com/150?text=realme+12+Pro+5G',
          },
          {
            name: 'OnePlus Nord 4',
            description: 'El OnePlus Nord 4 destaca por su rendimiento espectacular y una cámara mejorada, ofreciendo una experiencia de usuario premium a un precio competitivo.',
            barcode: '123456789013',
            price: 52999,
            stock: 45,
            imgUrl: 'https://via.placeholder.com/150?text=OnePlus+Nord+4',
          },
          {
            name: 'POCO M6 Pro',
            description: 'El POCO M6 Pro ofrece una pantalla AMOLED a 120 Hz y un brillo de hasta 1.300 nits, características destacadas en su gama, junto con un rendimiento sólido y una batería de larga duración.',
            barcode: '123456789014',
            price: 10000,
            stock: 80,
            imgUrl: 'https://via.placeholder.com/150?text=POCO+M6+Pro',
          }
         
        ]
        
      },
      {
        category: { name: 'Accesorios'},
        products: [
          {
            name: 'Cargador tipo V8',
            description: '1M 2.4A',
            barcode: '111222333',
            price: 5,
            stock: 200,
            imgUrl: 'https://via.placeholder.com/150',
          
          },
          {
            name: 'Cargador tipo C',
            description: '1M 2.4A',
            barcode: '444555666',
            price: 6,
            stock: 150,
            imgUrl: 'https://via.placeholder.com/150',
            
          },
        ],
      },
    ];

    // Insertar categorías y productos
    for (const entry of data) {
      // Crear categoría
      const category = this.categoryRepository.create(entry.category);
      const savedCategory = await this.categoryRepository.save(category);

      // Crear productos asociados a la categoría
      const products = entry.products.map(product => ({
        ...product,
        category: savedCategory,
      }));

      const productEntities = this.productRepository.create(products);
      await this.productRepository.save(productEntities);
    }

    console.log('Seed data inserted successfully');
    return "Seed data inserted successfully";
  }


  async seedUsers() {

   
    
    const users = [
      {
        email: "corona@hotmail.com",
        name: "Albert",
        password: "123456",
        address: "Hidalgo",
        phone: "36775578",
        city: "Zapopan",
        country: "Zapopan",
        isAdmin: UserRole.USER,
        birthday: "string",
        mobil: "3377552078"
      },
      {
        email: "albert@hotmail.com",
        name: "Albert",
        password: "123456",
        address: "Hidalgo",
        phone: "36775578",
        city: "Zapopan",
        country: "Zapopan",
        isAdmin: UserRole.SUPERADMIN,
        birthday: "string",
        mobil: "3377552078"
      },
      {
        email: "angel@hotmail.com",
        name: "Albert",
        password: "123456",
        address: "Hidalgo",
        phone: "36775578",
        city: "Zapopan",
        country: "Zapopan",
        isAdmin: UserRole.ADMIN,
        birthday: "string",
        mobil: "3377552078"
      }
    ];
  
    for (const user of users) {
      // Verificar si ya existe un usuario con el mismo correo electrónico
      const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
      if (existingUser) {
        console.log(`User with email ${user.email} already exists`);
        continue; // Salta al siguiente usuario
      }
       
      // Cifrar la contraseña (opcional, pero recomendado)
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
  
      // Crear y guardar el usuario
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
  
      console.log(`User with email ${user.email} seeded successfully`);
    }
  

   

    return 'All users processed';
  }
  
}
