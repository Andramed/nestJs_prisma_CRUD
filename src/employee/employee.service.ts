import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateEmpDto, EditEmp } from './dto';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class EmployeeService {
	constructor (private prisma: PrismaService){}
	async getAllEmpByManagerId(managerId: number, managerRole: number) {
		
		console.log({
			managerId,
			managerRole
		});
		
		const manager = await this.prisma.manager.findUnique({
			where: {
				id: managerId,
			}
		})
		if (!manager) {
			return {message: "this manager don't exist"}
		}
		switch (managerRole) {
			case 1:
					const allEmp = await this.prisma.employee.findMany();
					return allEmp
				
			case 2:
				const allEmpBymanagerId = await this.prisma.employee.findMany({
					where: {
						managerId: managerId
					}
				})
				return allEmpBymanagerId
			default:
				break;
		}
	}

	async createEmp(data: CreateEmpDto) {
		console.log('chemam serviciu', data);
		
		if (Number.isInteger(data.managerId)) {
			console.log('creat new emp');
			
			const newEmp = await this.prisma.employee.create({
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					managerId: data.managerId

				}
			});
			return newEmp.email;
		}
	}
	
	  
	  

	async deleteEmp(id: number, managerId:number, managerRole:number) {
		const user = await this.prisma.employee.findUnique({
			where : {
				id: id
			}
		})
		if (!user) {
			throw new ForbiddenException(`Employe with id: ${id} dont exist`)
		}
		if (user.managerId === managerId || managerRole === 1) {
			const deletedUser = await this.prisma.employee.delete({
				where: {
					id: id
				}
			})
			return deletedUser
		} else {
			throw new Error('Failed to delete manager not alloved to this');
		}
	
		
	}

	async editEmp (id: number, dto: EditEmp, managerId:number, managerRole:number) {
		const user = await this.prisma.employee.findUnique({
			where: {
				id: id
			}
		})
		if (!user) {
			throw new ForbiddenException('user not with this id not founded for editing')
		}
		if (managerId === user.managerId  || managerRole === 1) {
			console.log('au aceleasi iduri va fi schimbat');
			
			const editedUser = await this.prisma.employee.update({
				where: {
					id: id, 
				},
				data: dto
			})
			return editedUser
		} else {
			throw new Error("User no allowed to make changes");
			
		}

	}

}
