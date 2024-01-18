import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Get, Patch, Param, ParseIntPipe, Delete, Req } from '@nestjs/common';


import { ManagerModel } from 'src/interface/ManagerModel.interface';
import { JwtGuard } from 'src/auth/guard';
import { ManagerService } from './manager.service';
import { ManagerModelEdit } from 'src/interface/ManagerModeEdit.interface';

@Controller('manager')
export class ManagerController {

	constructor(
		private manager: ManagerService
	){}


	@HttpCode(HttpStatus.CREATED)
	@UseGuards(JwtGuard)
	@Post()
	signup(
		@Body() dto: ManagerModel,
		@Request() req,
	){	
		const creator = req.user
		if(!creator) {
			return {message: "dont find a valide creator to add a new manager"}
		}
		if (creator.role !== 1) {
			throw new Error("This user can not create a new manager");
			
		} else {
			const newManager = this.manager.addManager(dto);
			return newManager	
		}
	} 


	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtGuard)
	@Get()
	async getAllManager(
		@Request() req
	) {
		const user = req.user 
		if (!user) {
			return {message: "dont find a valide user to get all manager"}
		}

		if (user.role !== 1) {
			throw new Error("This user can not access all managers");
		} else {
			const allManager = await this.manager.getAllManager()
			console.log({
				location: "controller"
				, allManager
			});
			return allManager
		}
		
	}

	@HttpCode(HttpStatus.CREATED)
	@UseGuards(JwtGuard)
	@Patch(':id/edit')
	editManager(
		@Body() editDto: ManagerModelEdit,
		@Param('id', ParseIntPipe) id: number,

		@Request() req,
	){
		console.log("edit manager contrler");
		console.log(editDto);
		
		const manager = req.user
		if (!manager) {
			return{
				message: "Don't find manager"
			}
		}

		if (manager.role !== 1) {
			throw new Error("This manager can not do this operation");
		} else {
			const editedManager = this.manager.editManager(editDto, id);
			return editedManager 
		}
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtGuard)
	@Delete(":id/delete")
	async deleteManager(
		@Param("id", ParseIntPipe) id: number,
		@Request() req
	) {
		console.log("delete");
		
		const manager = req.user
		if (!manager) {
			return {
				message: "Don't finf manager"
			}
		}

		if(manager.role !== 1 ) {
			throw new Error("This manager can not do this operation");
			
		} else {
			const deletedManager = await this.manager.deleteManager(id);
			console.log(deletedManager);
			
			return deletedManager
		}
	}
 

}



