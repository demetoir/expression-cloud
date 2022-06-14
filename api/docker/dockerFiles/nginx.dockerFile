FROM nginx:1.22

EXPOSE 80

COPY ./nginx /etc/nginx

RUN nginx -t
