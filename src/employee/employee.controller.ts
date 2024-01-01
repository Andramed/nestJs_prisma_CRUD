import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Res, UseGuards, Request } from '@nestjs/common';
import { EmployeeService } from './employee.service';


import {Response} from 'express'
import { JwtGuard } from 'src/auth/guard';
import { CreateEmpDto, EditEmp } from '../employee/dto';

@Controller('employee')


export class EmployeeController {
	constructor(private empService: EmployeeService) {}

	@UseGuards(JwtGuard)
	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id/delete') 
	async deleteEmp(
		@Request() req,
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response
	) {
		console.log('try to delete user with id:', id);
		const manager = req.user
		const deletedEmp = await this.empService.deleteEmp(id, manager.id, manager.role);
		res.status(204).send();
		return deletedEmp;
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtGuard)
	@Patch(':id/edit')
	async editEmp (
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response,
		@Body() data: EditEmp,
		@Request() req,

	) {
		const manager = req.user
		const editedUser = await this.empService.editEmp(id, data, manager.id, manager.role);
		res.status(200).send(editedUser);
		return editedUser
	}


	@HttpCode(HttpStatus.CREATED)
	@UseGuards(JwtGuard)
	@Post('create')
	async addEmp(
		@Request() req,
		@Body() dto: CreateEmpDto,
		@Res() res: Response
	) {
		console.log('a fost chemat crete post');
		const creator = req.user
		if(!creator) {
			return {message: "dont find a valide creator to add a new emp"}
		}
		console.log({
			message: 'From create post'
		});
		console.log(
			{
				message: "Dto from controler",
				...dto
			}
		);
		
		const newEmp = await this.empService.createEmp({...dto, managerId:creator.id})
		console.log(newEmp);
		res.status(201).send({
			message: newEmp,
			status: 201
		})
		return newEmp
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtGuard)
	@Get('allemp')
	async getAllEmp(
		@Res() res: Response,
		@Request() req,
	){	
		console.log('try to obain all emp by role ');
		
		const manager = req.user
		const allEmp = await this.empService.getAllEmpByManagerId(manager.id, manager.role);
		res.status(200).send(allEmp);
		return allEmp 
	}
}