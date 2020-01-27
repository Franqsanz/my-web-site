'use strict';

// Dependencias de NPM
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const hbs = require('express-handlebars');
const serverless = require('serverless-http');
require('dotenv').config();

// Ficheros Locales
const index = require('./routes/index');
const definitionsPrivate = require('./routes/definitions-private');
const viewsStaticCtrl = require('./controllers/routerStatic');
const config = require('./config/config');

const app = express();

const HOST = process.env.HOST_LOCAL;
require('./config/conexionDB');

// Setting
app.engine(
    '.hbs',
    hbs({
        defaultLayout: 'default',
        extname: '.hbs'
    })
);
app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', '.hbs');

// Middlewares
app.use(
    helmet({
        contentSecurityPolicy: false,
        hpkp: false,
        hsts: true,
        frameguard: true,
        xssFilter: true
    })
);
app.use(express.static(__dirname + '/views/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, '/views/public/images/favicon.ico')));
app.use(cookie()); // usar cookies

// Routes
app.use('/.netlify/src/server', index);
app.use('/', index);
app.use('/definiciones-private', definitionsPrivate);

// 404
app.get('/404', viewsStaticCtrl.get404);
app.all('*', viewsStaticCtrl.getAll);

// le pasamos el puerto de escucha al servidor
app.listen(config.Port, () =>
    console.log(`server on port: ${HOST + config.Port}`)
);

module.exports.handler = serverless(app);