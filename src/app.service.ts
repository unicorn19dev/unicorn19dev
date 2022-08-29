import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VersionDB } from './seed/interfaces/version.interface';
import { SeedService } from './seed/seed.service';

@Injectable()
export class AppService {
	constructor(private seedService: SeedService) {
		seedService.loadInitialDBState();
	}
	getHello(): string {
		return 'Vetmergencia api online';
	}
}
