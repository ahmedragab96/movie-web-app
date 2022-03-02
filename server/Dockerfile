FROM node:16.14.0

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i --no-package-lock

COPY . .

CMD [ "npm" , "run" , "dev-server" ]
