FROM nginx:1.23.2

EXPOSE 80

COPY ./nginx /etc/nginx

RUN nginx -t
