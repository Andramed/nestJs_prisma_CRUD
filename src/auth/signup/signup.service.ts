import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from '../dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignupService {
	hash!:string
	constructor (
		private prisma: PrismaService, 
		private config: ConfigService,
		private jwt: JwtService
	) {}

	async signUp(credential: {email:string, password:string}) {
		console.log(this.config.get('SALT_ROUNDS'));
		const rounds = parseInt(this.config.get('SALT_ROUNDS'), 10);
		if (isNaN(rounds)) {
		// Handle the case where the provided value is not a valid number
		console.error('Invalid SALT_ROUNDS value. Please provide a valid number.');
		} else {
			const salt = await bcrypt.genSalt(rounds);
			this.hash = await bcrypt.hash(credential.password, salt);
		}
		const newManager = await this.prisma.manager.create({
			data: {
				email: credential.email,
				hash: this.hash,
				role: 'manager'
			}
		})
		delete newManager.hash
		 const token = await this.signUpToken(newManager.id, newManager.email, newManager.role);
		 return token
	}

	async creteAdminUser(credential:{email:string, password:string}) {
		const adminUser = await this.prisma.manager.findUnique({
			where: {email: credential.email}
		})
		const rounds = parseInt(this.config.get('SALT_ROUNDS'), 10);
			if (isNaN(rounds)) {
				console.error('Invalid SALT_ROUNDS value. Please provide a valid number.');
			} else {
				const salt = await bcrypt.genSalt(rounds);
				this.hash = await bcrypt.hash(credential.password, salt);
			}
		if (!adminUser) {
			console.log('admin user will be created');
			
			const admin = await this.prisma.manager.create({
				data: {
					email: credential.email,
					hash: this.hash,
					role: "admin"
				}
			})

			if (admin) {
				console.log("Admin user created");
			}
		}
	}

	async signIn(dtoSignIn: {email:string, password:string}){
		console.log(dtoSignIn);
		
		try {
			const user = await this.prisma.manager.findUnique( 
				{
					where: {
						email: dtoSignIn.email
					}
				}
			) 
			console.log(user);
			
			if (user) {
				try {
					console.log('try to compare password');
					
					const passMatche = await bcrypt.compare(dtoSignIn.password, user.hash);
					console.log('password checker');
					
					if (passMatche) {
						console.log('parolile coincid');
						return this.signUpToken(user.id, user.email, user.role)
					}
				} catch (error) { 
					console.log("passwor dosn't matche");
					 
				}
			}
		} catch (error) {
			console.log('user with this email dont finded');
			
		}
		
	}

	async signUpToken( userId: number , email:string, role:string) {
		const payload = {
			sub: userId,
			email,
			role
		}

		const token = await this.jwt.signAsync(payload, {
			expiresIn: "60m",
			secret: this.config.get('SECRET_JWT')
		})

		return {
			accesToken: token
		}
	}
}
