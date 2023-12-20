import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AddManagerService } from './auth/add-manager/add-manager.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const userService = app.get(AddManagerService);
  const config = app.get(ConfigService)
  userService.creteAdminUser(
	{
		email: config.get("ADMIN_LOGIN"),
		password: config.get("ADMIN_PASSWORD")
	}
  )

  app.enableCors()
  await app.listen(3000);
}
bootstrap();
