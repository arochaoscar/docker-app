FROM node:18-alpine

WORKDIR /home/node/app

COPY ./app/ /home/node/app
COPY entrypoint.sh .

RUN npm install --quiet --production

RUN npm i -g nodemon

EXPOSE 9000

ENTRYPOINT [ "/home/node/app/entrypoint.sh" ]
