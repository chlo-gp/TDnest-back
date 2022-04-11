import { Body, Controller,Delete,Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { createMessagesDto } from './dto/messages.dto';
import { Message } from './schema/messages.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/schema/users.schema';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createMessagesDto: createMessagesDto, @Request() req) {
    await this.messagesService.create(createMessagesDto, req.user.userId);
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Message> {
    return this.messagesService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.messagesService.delete(id);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() createMessagesDto: createMessagesDto) {
    return this.messagesService.update(id, createMessagesDto);
  }
}
