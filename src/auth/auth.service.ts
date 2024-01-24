import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService
	){}

	validateUser(email: string, hash: string): Observable<any> {
		const promise = (
			async () => {
				let user: { hash: any; id?: number; createdAt?: Date; email?: string; firstName?: string; lastName?: string; managerId?: number; role?: number; };
				try {
					user = await this.prisma.employee.findUnique({
						where:{
							email: email
						}
					});
					if (!user) {
						user = await this.prisma.manager.findUnique({
							where:{
								email: email
							}
						});
					}
				} catch (error) {
					throw new Error("User with this email don't finded")
				}

				if (user) {
					try {
						const passwordMatche = await bcrypt.compare(hash, user.hash);
						if (passwordMatche) {
							delete user.hash
							return user
						}
					} catch (error) {
						throw new Error("password dosn't match")
					}
				}
			}
		)();
		return from(promise) 
	}
	
	async login(user: any) {
		console.log({
			location: "auth service login",
			user
		});
		
		const payload = {
			firtsName: user.firstName,
			lastName: user.lastName,
			sub: user.id,
			role: user.role
		}
		return {
			tokenAcces: this.jwtService.sign(payload)
		}
		
	}
		
}	
