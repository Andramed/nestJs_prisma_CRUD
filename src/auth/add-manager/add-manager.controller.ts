import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from '../dto';
import { AddManagerService } from './add-manager.service';
import { ManagerModel } from 'src/interface/ManagerModel.interface';

@Controller('addmanager')
export class AddManagerController {

	constructor(
		private addManager: AddManagerService
	){}

	@Post()
	signup(
		@Body() dto: ManagerModel
	){
		const {data} = dto
		const newManager = this.addManager.addManager(data);
		return newManager	
	}

}

// > si cum implimentez ca de exemplu daca tokenul
//  este in storage la user in browser, atunci sa se logheze cu ajutorul tokenului 
