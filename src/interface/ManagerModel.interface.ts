import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'


export class ManagerModel {
	
	
		
		@IsEmail()
		email: string;

		@IsNotEmpty()
		password: string;

		@IsString()
		firstName: string;
		
		@IsString()
		lastName: string;
		
		@IsNumber()
		role: number

	
}