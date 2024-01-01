import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
		@IsEmail()
		@IsNotEmpty()
		email: string;

		@IsNotEmpty()
		@IsString()
		password: string

}