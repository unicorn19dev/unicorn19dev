import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateMedicalStoryDto } from './dto/medical-story.dto';

@Controller('medical-stories')
export class MedicalStoriesController {
	constructor() {}
}
