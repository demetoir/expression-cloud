FROM nginx:1.19.0

EXPOSE 80

COPY ./nginx /etc/nginx

RUN nginx -t
