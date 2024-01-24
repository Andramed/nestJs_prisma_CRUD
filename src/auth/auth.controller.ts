import { Controller, Get, Post, Res, Headers, UseGuards, Request, Body, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';

import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard';



@Controller('signin')
export class AuthController {
	
	constructor(
		private authService: AuthService
		) {}
	



	@UseGuards(JwtGuard) // excute the user try to sign in
	@Get('validate') 
	validateToke(
		@Headers() headers: any
	){}

	
	@UseGuards(LocalAuthGuard) // obtaine accestoke
	@Post() 
	async login(@Request() req) {
		try {
			const token = await this.authService.login(req.user);
			return token
		} catch (error) {
			if (error instanceof UnauthorizedException) {
				throw new HttpException("Invalid email or password", HttpStatus.UNAUTHORIZED);
			} else {
				throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
	
	

	
	
}
