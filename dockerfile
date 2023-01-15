FROM node:16.17.0 AS build
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm ci



# generated prisma files
RUN npx prisma generate

FROM node:16.17.0-alpine
WORKDIR /app
ENV NODE_ENV production
COPY --from=build /app ./

EXPOSE 8080
CMD ["npm", "run", "start:prod"]