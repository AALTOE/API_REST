FROM node:12

WORKDIR /API_REST

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "build/index.js" ]