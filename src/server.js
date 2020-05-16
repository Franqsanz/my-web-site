'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const helmet = require('helmet');
const hbs = require('express-handlebars');
require('dotenv').config();

// Ficheros Locales
const index = require('./routes/index');
const { get404, getAll } = require('./controllers/routerStatic');
const { Port } = require('./config/config');

const app = express();

const HOST = process.env.HOST_LOCAL;

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
app.use(cookie()); // usar cookies

// Routes
app.use('/', index);

// 404
app.get('/404', get404);
app.all('*', getAll);

// le pasamos el puerto de escucha al servidor
app.listen(Port, () => console.log(`server on port: ${HOST}${Port}`));