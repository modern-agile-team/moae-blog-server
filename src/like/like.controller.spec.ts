import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

describe('LikesController', () => {
  let controller: LikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [LikeService],
    }).compile();

    controller = module.get<LikeController>(LikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
