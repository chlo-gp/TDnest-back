import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/TP'), MessagesModule, AuthModule, UsersModule, ProductsModule,    
  ScheduleModule.forRoot()
],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule { }
