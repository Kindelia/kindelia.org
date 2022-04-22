from node:17-alpine as build

RUN mkdir -p /app/
WORKDIR /app/
COPY ./ ./

RUN npm install
RUN npm run build


from nginx:1 as main

COPY --from=build /app/build /usr/share/nginx/html

# fallback to /index.html
RUN sed -i 's/        index  index.html index.htm;/try_files \$uri \$uri\/ \/index.html;/' "/etc/nginx/conf.d/default.conf"
