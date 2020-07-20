FROM nginx:1.19.0

EXPOSE 80

# todo add volume for loggig

COPY ../nginx /etc/nginx

#CMD ["nginx", "-t"]
