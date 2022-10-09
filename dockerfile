FROM node:16.17.0

WORKDIR /moae-blog-server

COPY ./ .

# generated prisma files
COPY prisma ./prisma/

COPY ./package.json /moae-blog-server
COPY ./package-lock.json /moae-blog-server
COPY ./tsconfig.json /moae-blog-server

RUN npx prisma generate
RUN npm ci
RUN npm i -g @nestjs/cli@8.2.6

CMD ["npm", "run", "start:prod"]