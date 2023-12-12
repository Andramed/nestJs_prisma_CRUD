import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto';

@Injectable()
export class AuthService {

	constructor(private prisma: PrismaService){}

	signIn(dtoSignIn: SignInDto){
		console.log(dtoSignIn);
		
	}

}
