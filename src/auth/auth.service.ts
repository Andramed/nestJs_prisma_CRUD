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
				try {
					console.log('try to validate user');
					
					const user = await this.prisma.manager.findUnique({
						where: {
							email: email
						}
					})
					if (user) {
						try {
							const passMatche = await bcrypt.compare(hash, user.hash)
							if (passMatche) {
								delete user.hash
								return user								
							}
						} catch (error) {
							throw new Error("password don't match, please try again");	
						}
					}
				} catch (error) {
					throw new Error("User with tihsi email don't finded");
				}
			}
		)();
		return from(promise) 
	}

	async login(user: any) {
		const payload = {
			username: user.username,
			sub: user.id,
			role: user.role
		}
		return {
			acces_token: this.jwtService.sign(payload)
		}
	}
		
}	
