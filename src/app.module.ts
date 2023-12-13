import { Module } from '@nestjs/common';
import { EmployeeService } from './employee/employee.service';
import { EmployeeController } from './employee/employee.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

import { AddManagerController } from './auth/add-manager/add-manager.controller';
import { AddManagerService } from './auth/add-manager/add-manager.service';
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
		AddManagerService,
		JwtService
	],
  controllers: [
		EmployeeController, 
		AuthController, 
		AddManagerController
	],

})
export class AppModule {}
