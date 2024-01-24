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
    try {
		const user = await firstValueFrom(this.authService.validateUser(email, password));
		return user
	} catch (error) {
		console.log(error);
		throw new UnauthorizedException("Invalid credentials");
	}
  }
}

