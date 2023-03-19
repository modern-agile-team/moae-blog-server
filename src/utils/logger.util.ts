import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const env = process.env.NODE_ENV;

// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
export const logger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format:
        env === 'production'
          ? winston.format.simple()
          : winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike('moae-blog', {
                prettyPrint: true,
              }),
            ),
    }),
  ],
});
