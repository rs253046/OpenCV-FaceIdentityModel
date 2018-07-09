import trainingRoute from './openCV/trainingRoute';
import recognitionRoute from './openCV/recognitionRoute';
import registrationRoute from './users/registrationRoute';
import authenticationRoute from './users/authenticationRoute';
import userRoute from './users/userRoute';
import faceApiRoute from './microsoftFaceApi/faceApiRoute';
import config from '../../config/environment';
import exphbs from 'express-handlebars';
import express from 'express';

class Routes {
  constructor() {}

  configureExpress(app) {
    const configureExphbs = exphbs({
      extname: '.hbs',
      defaultLayout: 'default',
      layoutsDir: config.paths.defaultLayoutDirectory
    });

    app.engine('.hbs', configureExphbs);
    app.set('view engine', '.hbs');
    app.set('views', config.paths.viewsDirectory);
  }

  configureMiddlewares(app) {
    app.use(express.json({
      limit: '50mb'
    }));
    app.use(express.static(__dirname + '/public'));
  }

  configureCors(app) {
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Cache-Control, Content-Type, Accept, authorization, Pragma");
      next();
    });
  }

  create(app, ioSocket) {
    app.use('/training', trainingRoute(ioSocket));
    app.use('/token', authenticationRoute());
    app.use('/recognition', recognitionRoute(ioSocket));
    app.use('/user', userRoute());
    app.use('/registration', registrationRoute());
    app.use('/faceApi', faceApiRoute());
  }
}

export default new Routes();