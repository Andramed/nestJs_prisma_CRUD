import { Module } from '@nestjs/common';
import { EmployeeService } from './employee/employee.service';
import { EmployeeController } from './employee/employee.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';


import { AddManagerController } from './auth/add-manager/add-manager.controller';
import { AddManagerService } from './auth/add-manager/add-manager.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ManagerController } from './manager/manager.controller';
import { ManagerService } from './manager/manager.service';



@Module({
  imports: [
		PrismaModule,
		ConfigModule.forRoot({
			isGlobal: true
		}),
		AuthModule,
	],
  providers: [
		EmployeeService, 

		AddManagerService,
		JwtService,
		ManagerService
	],
  controllers: [
		EmployeeController, 
		AuthController, 
		AddManagerController, ManagerController
	],

})
export class AppModule {}
