FROM node:12

WORKDIR /API_REST/build

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "build/src/index.js" ]