import { Module } from '@nestjs/common';
import { MedicalStoriesService } from './medical-stories.service';
import { MedicalStoriesController } from './medical-stories.controller';

@Module({
  controllers: [MedicalStoriesController],
  providers: [MedicalStoriesService]
})
export class MedicalStoriesModule {}
