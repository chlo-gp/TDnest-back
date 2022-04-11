import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { createProductDto } from './dto/products.dto';
import { Product } from './schema/products.schema';
import { Roles } from '../roles.decorator'
import { Role } from 'src/role.enum';
import { RolesGuard } from 'src/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() createProductDto: createProductDto) {
    await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() createProductDto: createProductDto) {
    return this.productsService.update(id, createProductDto);
  }
}
