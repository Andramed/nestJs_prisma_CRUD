import { Module } from '@nestjs/common';
import { EmployeeService } from './employee/employee.service';
import { EmployeeController } from './employee/employee.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

import { SignupController } from './auth/signup/signup.controller';
import { SignupService } from './auth/signup/signup.service';
import { JwtService } from '@nestjs/jwt';



@Module({
  imports: [
		PrismaModule,
		ConfigModule.forRoot({
			isGlobal: true
		}),
	],
  providers: [
		EmployeeService, 
		AuthService, 
		SignupService,
		JwtService
	],
  controllers: [
		EmployeeController, 
		AuthController, 
		SignupController
	],

})
export class AppModule {}
