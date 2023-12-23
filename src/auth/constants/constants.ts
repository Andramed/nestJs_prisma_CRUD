
import { ConfigService } from '@nestjs/config';

export class Constants {
    SECRET_JWT: string;

    constructor(private config: ConfigService){
        this.SECRET_JWT = this.config.get("SECRET_JWT");
    }
}
