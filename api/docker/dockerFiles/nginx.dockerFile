FROM nginx:1.21.4

EXPOSE 80

COPY ./nginx /etc/nginx

RUN nginx -t
