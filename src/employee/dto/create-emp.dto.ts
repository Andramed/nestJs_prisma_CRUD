import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateEmpDto {

		@IsString()
		firstName: string
		@IsString()
		lastName: string
		@IsEmail()
		email: string
		@IsString()
		@IsNotEmpty()
		password: string
		managerId: number
	
}