FROM node:16.17.0

WORKDIR /moae-blog-server/

# generated prisma files
COPY prisma ./prisma/


COPY ./package.json /moae-blog-server/
COPY ./package-lock.json /moae-blog-server/

RUN npx prisma generate
RUN npm install

COPY . /moae-blog-server
CMD npm run start:dev