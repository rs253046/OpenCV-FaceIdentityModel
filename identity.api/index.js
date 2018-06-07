import express from 'express';
import http from 'http';
import config from './config/environment';
import exphbs from 'express-handlebars';
import io from 'socket.io';
import photoboothRoute from './src/routes/photoboothRoute';
import recognizePhotoBooth from './src/routes/recognizePhotoBoothRoute';
import authenticationRoute from './src/routes/authenticationRoute';
import registrationRoute from './src/routes/registrationRoute';
import userRoute from './src/routes/userRoute';
const port = config.port;
const app = express();
const httpServer = http.Server(app);
const ioSocket = io(httpServer);
const configureExphbs = exphbs({
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir: config.paths.defaultLayoutDirectory
});

app.engine('.hbs', configureExphbs);
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Cache-Control, Content-Type, Accept, authorization, Pragma");
  next();
});

app.set('view engine', '.hbs');
app.set('views', config.paths.viewsDirectory);

app.use(express.static(__dirname + '/public'));
app.use('/', photoboothRoute(ioSocket));
app.use('/token', authenticationRoute());
app.use('/recognizePhotoBooth', recognizePhotoBooth(ioSocket));
app.use('/user/userInfo', userRoute());
app.use('/registration', registrationRoute());
httpServer.listen(port, function(server) {
  console.log('Listening on port %d', port);
});