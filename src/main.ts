import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AddManagerService } from './auth/add-manager/add-manager.service';
import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

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
	app.use((req: Request, res: Response, next: NextFunction) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	})

	app.useGlobalPipes(new ValidationPipe())

	await app.listen(3000);
}
bootstrap();
