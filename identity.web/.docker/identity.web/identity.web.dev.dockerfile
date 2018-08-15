FROM node:latest

LABEL author="FaceIdentityWeb"

WORKDIR /var/www

ENV NODE_ENV=development
ENV PORT=3001 

VOLUME [ "/var/www" ]

EXPOSE ${PORT} 49153

ENTRYPOINT ["npm", "start"]