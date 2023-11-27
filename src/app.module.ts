import { Module } from '@nestjs/common';
import { EmployeeService } from './employee/employee.service';
import { EmployeeController } from './employee/employee.controller';



@Module({
  imports: [],
  providers: [EmployeeService],
  controllers: [EmployeeController],

})
export class AppModule {}
