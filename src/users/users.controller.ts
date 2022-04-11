import { Body, Controller,Delete,Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/users.dto';
import { User } from './schema/users.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createMessagesDto: createUserDto) {
    await this.usersService.create(createMessagesDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() createMessagesDto: createUserDto) {
    return this.usersService.update(id, createMessagesDto);
  }
}
