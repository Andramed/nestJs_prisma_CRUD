import { Controller, Get, Post, Res, Headers, UseGuards, Request } from '@nestjs/common';

import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard';



@Controller('signin')
export class AuthController {
	
	constructor(
		private authService: AuthService
		) {}
	@Get()
	testGet(){
		return {message: 'Test get'}
	}


	@UseGuards(JwtGuard) // excute the user try to sign in
	@Get('validate') 
	validateToke(
		@Headers() headers: any
	){
		console.log({
			message: 'try to validate token at back end side',
			headers
		});
		
	}
	@UseGuards(LocalAuthGuard) // obtaine accestoke
	@Post() 
	async login(@Request() req) {
		console.log('query POST login');
		const token = this.authService.login(req.user)
		console.log({
			cretedToken: await token
		});
		return await token
	}

	@UseGuards(JwtGuard) // test if token is present return user
	@Get('testjwt')
	getTest(
		@Request() req
	) {
		return req.user
	}
	
}
