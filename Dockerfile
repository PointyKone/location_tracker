FROM node:19.2-alpine

WORKDIR /usr

COPY package.json ./

COPY tsconfig.json ./

COPY src ./src

RUN ls -a

RUN npm install

RUN npm run build

## this is stage two , where the app actually runs

FROM node:19.2-alpine

WORKDIR /usr

COPY package.json prisma .env ./

RUN npm install --only=production

COPY --from=0 /usr/dist .

EXPOSE 8002

CMD ["node","server.js"]