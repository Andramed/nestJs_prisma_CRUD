import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmpDto } from './dto';

import {Response} from 'express'

@Controller('employee')


export class EmployeeController {
	constructor(private empService: EmployeeService) {}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	createNewEmp(
		@Body() dto: CreateEmpDto,
		@Res() res: Response
	){	
		const newEmp = this.empService.createEmp(dto)
		res.status(201).send({
			message: newEmp,
			status: 201
		})
		return newEmp
	}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAllEmp(
		@Res() res: Response
	) {
		console.log('get all emp');
		
		const allEmp = await this.empService.getAllEmp();
		console.log(allEmp);
		
		res.status(200).send(allEmp);
		return allEmp
	}
}
