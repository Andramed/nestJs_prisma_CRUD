import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from '../dto';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {

	constructor(
		private signUpService: SignupService
	){}

	@Post()
	signup(
		@Body() dto: SignUpDto
	){
		
		const {data} = dto
		const tokenManager = this.signUpService.signUp(data);
		return tokenManager
		
	}

}

// > si cum implimentez ca de exemplu daca tokenul
//  este in storage la user in browser, atunci sa se logheze cu ajutorul tokenului 
