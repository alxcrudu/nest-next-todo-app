import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../.env.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    TodosModule,
    UsersModule,
    AuthModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
