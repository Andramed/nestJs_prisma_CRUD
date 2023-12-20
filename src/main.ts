import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AddManagerService } from './auth/add-manager/add-manager.service';
import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const corsOption: CorsOptions = {
	
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const userService = app.get(AddManagerService);
  const config = app.get(ConfigService)
  const createdAdminUSer = await userService.creteAdminUser(
	{
		email: config.get("ADMIN_LOGIN"),
		password: config.get("ADMIN_PASSWORD")
	}
  )

  app.enableCors(
	corsOption
  )
  await app.listen(3000);

  console.log({
	status: 'start to port 3000',
	user: createdAdminUSer

  });
  
}
bootstrap();
