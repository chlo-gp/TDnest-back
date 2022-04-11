import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { MessagesController } from './messages.controller';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';
import {Message, messageSchema} from './schema/messages.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: messageSchema }]),UsersModule],
  controllers: [MessagesController],
  providers: [MessagesGateway ,MessagesService]
})
export class MessagesModule {}
