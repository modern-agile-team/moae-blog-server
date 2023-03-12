import { Injectable } from '@nestjs/common';
import { image, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImagesRepository extends PrismaService {
  /**
   * 한개의 이미지 select문
   * @param imageId
   */
  async selectOneImage(imageId: Prisma.imageWhereUniqueInput) {
    return this.image.findUnique({
      where: imageId,
    });
  }

  /**
   * 새로운 이미지 생성 create문
   * @param data { boardId, imgUrl }
   */
  async createImage(data: Prisma.imageCreateInput): Promise<image> {
    return this.image.create({
      data,
    });
  }

  /**
   * 한개의 이미지 정보 update문
   * @param params { where, data }
   */
  async updateImage(params: {
    where: Prisma.imageWhereUniqueInput;
    data: Prisma.imageUpdateInput;
  }): Promise<image> {
    const { where, data } = params;
    return this.image.update({
      data,
      where,
    });
  }

  /**
   * 한개의 이미지 delete문
   * @param where
   */
  async deleteImage(where: Prisma.imageWhereUniqueInput): Promise<image> {
    return this.image.delete({
      where,
    });
  }
}
