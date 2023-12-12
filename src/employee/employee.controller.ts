import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmpDto, EditEmp } from './dto';

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
		console.log(dto);
		
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
		@Res() res: Response,
		@Query('managerId', ParseIntPipe) managerId: number
	) {
		console.log(typeof managerId, managerId);
		
		const allEmp = await this.empService.getAllEmpByManagerId(managerId);
		res.status(200).send(allEmp);
		return allEmp
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id') 
	async deleteEmp(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response
	) {
		console.log('try to delete user with id:', id);
		
		const deletedEmp = await this.empService.deleteEmp(id);
		res.status(204).send();
		return deletedEmp;
	}

	@HttpCode(HttpStatus.OK)
	@Patch(':id')
	async editEmp (
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response,
		@Body() data: EditEmp

	) {
		const editedUser = await this.empService.editEmp(id, data);
		res.status(200).send(editedUser);
		return editedUser
	}
}