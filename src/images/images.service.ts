import { Injectable } from '@nestjs/common';
import { ImagesRepository } from './repository/images.repository';

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}
}
