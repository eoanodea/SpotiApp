FROM node:6.11.1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . .
RUN npm install -g nodemon
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]