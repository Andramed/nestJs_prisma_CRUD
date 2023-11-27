import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmpDto } from './dto';

import {Response} from 'express'

@Controller('employee')


export class EmployeeController {
	constructor(private empService: EmployeeService) {}

	@Get()
	getAllEmp(
		@Res() res: Response
	){
		res.status(200).send({message: "All users"})
		return this.empService.getAllEmp()
	}
	@HttpCode(HttpStatus.CREATED)
	@Post()
	createNewEmp(
		@Body() dto: CreateEmpDto,
		@Res() res: Response
	){
		res.status(201).send({
			message: `user ${dto.email} created`,
			status: 201
		})
		return this.empService.createEmp(dto)
	}
}
