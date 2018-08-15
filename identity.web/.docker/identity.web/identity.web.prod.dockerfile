FROM node:latest

LABEL author="FaceIdentity"

WORKDIR /var/www
COPY . /var/www

ENV NODE_ENV=production
ENV PORT=3000

RUN npm install -g pm2@latest

VOLUME [ "/var/www" ]

EXPOSE ${PORT}

ENTRYPOINT ["npm", "start"]