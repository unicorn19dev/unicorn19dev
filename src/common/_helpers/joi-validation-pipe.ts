import {
	ArgumentMetadata,
	PipeTransform,
	Injectable,
	BadRequestException,
} from '@nestjs/common';

import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
	constructor(private schema: ObjectSchema) {}

	transform(value: any, metadata: ArgumentMetadata) {
		const { error } = this.schema.validate(value);
		console.log(error);
		if (error) {
			const errorMessages = error.details.map((d) => d.message).join();

			throw new BadRequestException(errorMessages);
		}

		return value;
	}
}
