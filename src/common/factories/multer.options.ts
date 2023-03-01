import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import * as path from 'path';

export const multerOptionsFactory = (
  configService: ConfigService,
): MulterOptions => {
  const s3 = new S3Client({
    region: configService.get('AWS_BUCKET_REGION'),
  });

  return {
    storage: multerS3({
      s3,
      bucket: configService.get('AWS_BUCKET_NAME'),
      contentType(req, file, done) {
        done(null, file.mimetype);
      },
      key(req, file, done) {
        const fieldName = file.fieldname;
        const mimetype = file.mimetype.split('/');
        const basename = path.basename(file.originalname, `.${mimetype[1]}`);
        let key = `content/${basename}_${Date.now()}.${mimetype[1]}`;
        if (fieldName === 'thumbnail') {
          key = `thumbnail/${basename}_${Date.now()}.${mimetype[1]}`;
        }
        done(null, key);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  };
};
