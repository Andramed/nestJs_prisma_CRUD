import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignInDto } from './dto';
import { AuthService } from './auth.service';
import { SignupService } from './signup/signup.service';


@Controller('signin')
export class AuthController {
	@Get()
	testGet(){
		return {message: 'Test get'}
	}
	constructor(
		
		private auth: SignupService

		) {}

	

	@Post() 
	async signIn(
		@Res() res: Response,
		@Body() signInDto: SignInDto
	) {	
		console.log('Post called');
		const {data} = signInDto
		const jwtToken = await this.auth.signIn(data);
		
		res.status(200).send({...jwtToken})
		return jwtToken
		
	}
}
