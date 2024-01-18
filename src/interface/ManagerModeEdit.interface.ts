import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'


export class ManagerModelEdit {
		@IsOptional()
		@IsEmail()
		email: string;

		// @IsOptional()
		// @IsNotEmpty()
		password: string;

		@IsOptional()
		@IsString()
		firstName: string;

		@IsOptional()
		@IsString()
		lastName: string;

		@IsOptional()
		@IsNumber()
		role: number
}