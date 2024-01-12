import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';


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

}
