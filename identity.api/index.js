//3rd Party Modules
import express from 'express';
import http from 'http';
import io from 'socket.io';

//Local Modules
import config from './config/environment';
import Routes from './src/routes';

const app = express();
const httpServer = http.Server(app);
const ioSocket = io(httpServer);

//************************************
// Configure Routes
//************************************

Routes.configureExpress(app);
Routes.configureCors(app);
Routes.configureMiddlewares(app);
Routes.create(app, ioSocket);

process.on('uncaughtException', function(err) {
  if (err) console.log(err, err.stack);
});

httpServer.listen(config.port, function (err) {
  console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, config.port);
});


//*********************************************************
//    Quick and dirty way to detect event loop blocking
//*********************************************************
let lastLoop = Date.now();

const monitorEventLoop = () => {
    const time = Date.now();
    if (time - lastLoop > 1000) console.error('Event loop blocked ' + (time - lastLoop));
    lastLoop = time;
    setTimeout(monitorEventLoop, 200);
}

if (process.env.NODE_ENV === 'development') {
    monitorEventLoop();
}