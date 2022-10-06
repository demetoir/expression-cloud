FROM nginx:1.23.1

EXPOSE 80

COPY ./nginx /etc/nginx

RUN nginx -t
