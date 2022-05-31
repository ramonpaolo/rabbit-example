FROM nginx:1.21-alpine

WORKDIR /etc/nginx/conf.d

RUN rm -rf ./default.conf

COPY ./docker/settings/nginx.conf ./

CMD ["nginx", "-g", "daemon off;"]