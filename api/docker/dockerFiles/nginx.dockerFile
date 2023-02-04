FROM nginx:1.23

EXPOSE 80

COPY ./nginx /etc/nginx

RUN nginx -t
