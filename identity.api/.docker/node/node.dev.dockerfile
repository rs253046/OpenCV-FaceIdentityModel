FROM node:latest

LABEL author="FaceIdentity"

WORKDIR /var/www

ENV NODE_ENV=development
ENV PORT=3000

VOLUME [ "/var/www" ]

RUN rm -rf node_module

RUN npm install -g pm2@latest

EXPOSE ${PORT}

ENTRYPOINT ["npm", "start"]