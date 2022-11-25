FROM node:16

WORKDIR /home/node/app

COPY ./app/ /home/node/app

RUN npm install --quiet --production

RUN npm i -g nodemon

EXPOSE 3000

CMD [ "nodemon" , "index.js" ]
