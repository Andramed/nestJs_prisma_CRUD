import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Get } from '@nestjs/common';


import { ManagerModel } from 'src/interface/ManagerModel.interface';
import { JwtGuard } from 'src/auth/guard';
import { ManagerService } from './manager.service';

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
 

}



