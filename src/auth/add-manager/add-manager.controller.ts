import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { SignUpDto } from '../dto';
import { AddManagerService } from './add-manager.service';
import { ManagerModel } from 'src/interface/ManagerModel.interface';
import { JwtGuard } from '../guard';

@Controller('addmanager')
export class AddManagerController {

	constructor(
		private addManager: AddManagerService
	){}


	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtGuard)
	@Post()
	signup(
		@Body() dto: ManagerModel,
		@Request() req,
	){	
		const creator = req.user
		if(!creator) {
			return {message: "dont find a valide creator to add a new emp"}
		}
		const {data} = dto
		const newManager = this.addManager.addManager(data);
		return newManager	
	} 

}

// > si cum implimentez ca de exemplu daca tokenul
//  este in storage la user in browser, atunci sa se logheze cu ajutorul tokenului 
