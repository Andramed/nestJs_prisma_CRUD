import { Injectable } from '@nestjs/common';
import { CreateEmpDto } from './dto';

@Injectable()
export class EmployeeService {

	getAllEmp() {
		console.log('get all emp called');
		return { message: "Data obtained"}
	}

	createEmp(data: CreateEmpDto) {
		console.log(data);
		return { message: "Data obtained"}
		
	}

}
