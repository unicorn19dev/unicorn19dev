import { Injectable } from '@nestjs/common';
import { SeedService } from './modules/seed/seed.service';

@Injectable()
export class AppService {
	constructor(private seedService: SeedService) {
		seedService.loadInitialDBState();
	}
	getHello(): string {
		return 'Vetmergencia api online';
	}
}
