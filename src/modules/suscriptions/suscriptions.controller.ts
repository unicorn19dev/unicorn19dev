import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuscriptionsService } from './suscriptions.service';
import { CreateSuscriptionDto } from './dto/suscription.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('K')
@Controller('suscriptions')
export class SuscriptionsController {
	constructor() {}
}
