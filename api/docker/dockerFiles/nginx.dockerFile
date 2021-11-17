FROM nginx:1.20.2

EXPOSE 80

COPY ./nginx /etc/nginx

RUN nginx -t
