import express from 'express';
import http from 'http';
import config from './config/environment';
import io from 'socket.io';
import Routes from './src/routes';

const app = express();
const httpServer = http.Server(app);
const ioSocket = io(httpServer);

Routes.configureExpress(app);
Routes.configureCors(app);
Routes.configureMiddlewares(app);
Routes.create(app, ioSocket);

httpServer.listen(config.port, function (server) {
  console.log('Listening on port %d', config.port);
});