import { Injectable } from '@nestjs/common';
import { CreateMedicalStoryDto } from './dto/medical-story.dto';

@Injectable()
export class MedicalStoriesService {
	create(createMedicalStoryDto: CreateMedicalStoryDto) {
		return 'This action adds a new medicalStory';
	}

	findAll() {
		return `This action returns all medicalStories`;
	}
}
