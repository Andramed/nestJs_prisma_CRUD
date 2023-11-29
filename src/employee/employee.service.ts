import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEmpDto, EditEmp } from './dto';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class EmployeeService {
	constructor (private prisma: PrismaService){}
	async getAllEmp() {
		const allEmp = await this.prisma.employee.findMany(); 
		return allEmp
	}

	async createEmp(data: CreateEmpDto) {
		
		
		const newEmp = await this.prisma.employee.create(
			{
				data: {
					...data
				}
			}
		)
		return newEmp.email
	}

	async deleteEmp(id: number) {
		const user = await this.prisma.employee.findUnique({
			where : {
				id: id
			}
		})
		if (!user) {
			throw new ForbiddenException(`Employe with id: ${id} dont exist`)
		}
		const deletedUser = await this.prisma.employee.delete({
			where: {
				id: id
			}
		})
	
		if (deletedUser && deletedUser.email) {
			return deletedUser.email;
		} else {
			throw new Error('Failed to delete user or retrieve email');
		}
	}

	async editEmp (id: number, dto: EditEmp) {
		const user = await this.prisma.employee.findUnique({
			where: {
				id: id
			}
		})
		if (!user) {
			throw new ForbiddenException('user not with this id not founded for editing')
		}
		const editedUser = await this.prisma.employee.update({
			where: {
				id: id, 
			},
			data: dto
		})
		return editedUser
	}

}
