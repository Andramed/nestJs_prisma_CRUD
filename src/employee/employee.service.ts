import { Injectable } from '@nestjs/common';
import { CreateEmpDto } from './dto';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class EmployeeService {
	constructor (private prisma: PrismaService){}
	async getAllEmp() {
		const allEmp = await this.prisma.employee.findMany(); 
		return allEmp
	}

	async createEmp(data: CreateEmpDto) {
		console.log('este chemat serviciu de a crea nou emp');
		
		const newEmp = await this.prisma.employee.create(
			{
				data: {
					...data
				}
			}
		)
		return newEmp.email
	}

}
