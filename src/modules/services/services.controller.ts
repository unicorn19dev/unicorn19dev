import { Body, Controller, Post, Get } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ApiTags } from '@nestjs/swagger';
import { ServiceDTO } from './dto/service.dto';
import { JoiValidationPipe } from 'src/common/_helpers/joi-validation-pipe';
import { createService } from 'src/common/_helpers/services/service.validators';
import { messagges } from 'src/common/_helpers/messages';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
	constructor(private serviceService: ServiceService) {}
	@Post('')
	async createService(
		@Body(new JoiValidationPipe(createService)) service: ServiceDTO,
	) {
		const data = await this.serviceService.createService(service);
		return {
			message: messagges.CREATE_SERVICE,
			data,
		};
	}

	@Get('')
	async getAll() {
		const data = await this.serviceService.getAll();
		return {
			message: messagges.CREATE_SERVICE,
			data,
		};
	}
}
