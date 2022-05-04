from node:17-alpine as build

RUN mkdir -p /app/
WORKDIR /app/
COPY ./ ./

RUN cd ./tools/ && npm install --production && npm run build
RUN npm install --production
RUN npm run build

# CMD npm run start
CMD node ./server.js

EXPOSE 80
