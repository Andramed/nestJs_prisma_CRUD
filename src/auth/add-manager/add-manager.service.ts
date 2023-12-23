import { Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from '../dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import {ManagerModel} from '../../interface/ManagerModel.interface'

@Injectable()
export class AddManagerService {
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
	}) {
		console.log(this.config.get('SALT_ROUNDS'));
		console.log(credential);
		
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
					role: 1
				}
			})
			if (admin) {
				console.log("Admin user created");
			}
		}
	}

	async signIn(dtoSignIn: {email:string, password:string}){
		try {
				const user = await this.prisma.manager.findUnique( 
					{
						where: {
							email: dtoSignIn.email
						}
					}
				) 
				if (user) {
					try {
						console.log('try to compare password');
						
						const passMatche = await bcrypt.compare(dtoSignIn.password, user.hash);
						console.log('password checker');
						
						if (passMatche) {
							console.log('parolile coincid');
							return this.signUpToken(user.id, user.role)
						}
					} catch (error) { 
						console.log("passwor dosn't matche");
						
					}
				}
		} catch (error) {
			console.log('user with this email dont finded');
		}
	}

	async signUpToken( UID: number , R:number) {
		const payload = {
			UID,
			R
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
