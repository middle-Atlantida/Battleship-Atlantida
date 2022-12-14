FROM node:16.14.2
WORKDIR /var/www
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE $PORT
CMD npm run server
