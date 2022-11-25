FROM ubuntu:20.04

WORKDIR /home/node/app

COPY ./src/ /home/node/app/src

COPY package.json /home/node/app

COPY ./entrypoint.sh .

RUN apt-get update

RUN apt-get install -y  wget curl gnupg

RUN curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh

RUN bash nodesource_setup.sh

RUN apt install nodejs

RUN npm install --quiet --production

RUN npm i -g nodemon

EXPOSE 4000

ENTRYPOINT [ "/home/node/app/entrypoint.sh" ]