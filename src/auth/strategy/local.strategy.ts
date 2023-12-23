import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Observable, firstValueFrom } from 'rxjs';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
		passReqToCallback: true
	});
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
	console.log('try to validate');
	console.log(email, password);
	console.log(req.body);
	
	
    try {
		const user = await firstValueFrom(this.authService.validateUser(email, password));
		if (!user) {
			throw new UnauthorizedException();
			
		}
		return user
	} catch (error) {
		console.log(error);
		throw new Error("User not validated");
		
	}
    
  }
}

