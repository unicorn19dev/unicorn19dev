import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminUser } from '../users/dto/user.dto';
import { ServiceDTO } from './dto/service.dto';
import { Service } from './schemas/service.schema';

@Injectable()
export class ServiceService {
	constructor(
		@InjectModel('Services') private serviceModel: Model<Service>,
		@InjectModel('AdminUsers') private adminUserModel: Model<AdminUser>,
	) {}

	createService(service: ServiceDTO) {
		const newService = new this.serviceModel({
			...service,
			status: true,
		});
		newService.save();
		return newService;
	}

	async getAll() {
		const allServices = await this.serviceModel.find();
		return allServices;
	}
}
