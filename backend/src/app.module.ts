import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import 'dotenv/config';
@Module({
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService], // Add JwtService to providers
  imports: [UsersModule, AuthModule, JwtModule], // Add JwtModule to imports
})
export class AppModule {}
