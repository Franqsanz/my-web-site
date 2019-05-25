const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const favicon = require('serve-favicon');
const moment = require('moment');

const index = require('./routes/index');
const EmailCtrl = require('./mail/mailCtrl');
const app = express();

const PORT = process.env.PORT || 8888;
const HOST = process.env.HOST || 'http://localhost:' + PORT;

require('./config/conexionDB');
require('./passport/local_auth');

//setting
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'hbs');

//middlewares
app.use(express.static(__dirname + '/views/public/'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(favicon('src/views/public/images/favicon.ico'));

// utilizar las cookies
app.use(cookie());

// utilizar las sesiones
app.use(session({
    secret: 'franqsanz media',
    resave: false,
    saveUninitialized: false
}));

//inicializar passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', index);
//app.use('/contacto', EmailCtrl.sendEmail); //email route

app.listen(PORT, () => console.log('server on port: '+ HOST));