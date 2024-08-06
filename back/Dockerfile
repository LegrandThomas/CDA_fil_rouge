FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i 

COPY . . 

RUN npm run build 

EXPOSE 3001

CMD ["sh", "-c", "npx ts-node ./run-migrations.ts && npm run start"]