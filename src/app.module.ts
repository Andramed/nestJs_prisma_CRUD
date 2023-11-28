import { Module } from '@nestjs/common';
import { EmployeeService } from './employee/employee.service';
import { EmployeeController } from './employee/employee.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
	PrismaModule,
	ConfigModule.forRoot({
		isGlobal: true
	})
],
  providers: [EmployeeService],
  controllers: [EmployeeController],

})
export class AppModule {}
