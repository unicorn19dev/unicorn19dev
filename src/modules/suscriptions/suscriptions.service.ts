import { Injectable } from '@nestjs/common';
import { CreateSuscriptionDto } from './dto/suscription.dto';

@Injectable()
export class SuscriptionsService {
	create(createSuscriptionDto: CreateSuscriptionDto) {
		return 'This action adds a new suscription';
	}

	findAll() {
		return `This action returns all suscriptions`;
	}
}
