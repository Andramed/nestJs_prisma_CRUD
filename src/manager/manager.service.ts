import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ManagerModelEdit } from 'src/interface/ManagerModeEdit.interface';


@Injectable()
export class ManagerService {
	hash!:string
	constructor (
		private prisma: PrismaService, 
		private config: ConfigService,
		private jwt: JwtService
	) {}
	async addManager(credential: {
									email: string,
									password: string,
									firstName: string,
									lastName: string,
								}) 
	{	
		const rounds = parseInt(this.config.get('SALT_ROUNDS'), 10);
		if (isNaN(rounds)) {
		console.error('Invalid SALT_ROUNDS value. Please provide a valid number.');
		} else {
			const salt = await bcrypt.genSalt(rounds);
			this.hash = await bcrypt.hash(credential.password, salt);
		}
		const newManager = await this.prisma.manager.create({
			data: {
				email: credential.email,
				hash: this.hash,
				firstName: credential.firstName,
				lastName: credential.lastName,
				role: 2
			}
		})
		 return newManager
	}

	async creteAdminUser(credential:{email:string, password:string}) {
		const adminUser = await this.prisma.manager.findUnique({
			where: {email: credential.email}
		})
		
		if (!adminUser) {
			console.log('admin user will be created');
			const rounds = parseInt(this.config.get('SALT_ROUNDS'), 10);
			if (isNaN(rounds)) {
				console.error('Invalid SALT_ROUNDS value. Please provide a valid number.');
			} else {
				const salt = await bcrypt.genSalt(rounds);
				this.hash = await bcrypt.hash(credential.password, salt);
			}
			
			const admin = await this.prisma.manager.create({
				data: {
					email: credential.email,
					hash: this.hash,
					role: 1
				}
			})
			if (admin) {
				console.log("Admin user created");
			}
		}
	}

	async getAllManager() {
		const allManager = await this.prisma.manager.findMany();
		return allManager
	}

	async editManager(editDTO: ManagerModelEdit, idManager: number) {
		console.log({
			location: "edit manager service",
			editDTO
		});
		
		const manager = await this.prisma.manager.findUnique({
			where: {
				id: idManager
			}
		})
	
		if (!manager) {
			throw new Error(`Manager with id : ${idManager} not found`);
		}
	
		try {
			const editedUser = await this.prisma.manager.update({
				where: {id: idManager},
				data: editDTO
			})
			return editedUser;
		} catch (error) {
			console.log(error);
			
			throw new Error("Manager could not be updated");
		}
	}

	async deleteManager(id: number) {
		const manager = await this.prisma.manager.findUnique({
			where: {
				id: id
			}
		})

		if (!manager) {
			return {
				message: `Mnaager with ${id} don't finded` 
			}
		}

		try {
			const deleteEmpOfManager = await this.prisma.employee.deleteMany({
				where: {
					managerId: manager.id
				}
			})
			if (deleteEmpOfManager) {
				const deletedUser = await this.prisma.manager.delete({
					where: {
						id: id
					}
				})
				return deletedUser
			}

		
		} catch (error) {
			console.log({
				error,
				"message": "user cannot be deleted"
			});
			
		}
	}
	

}
