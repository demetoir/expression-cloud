FROM nginx:stable

EXPOSE 80

COPY ./nginx /etc/nginx

RUN nginx -t
