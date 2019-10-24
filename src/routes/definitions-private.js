'use strict';

const definitionsPrivate = require('express').Router();
const definitionsCtrl = require('../controllers/definitions');

// rutas de las definiciones
definitionsPrivate.get('/newDefiniciones', definitionsCtrl.getNewDefinitions);
definitionsPrivate.get('/', definitionsCtrl.getDefinitionsPrivate);
definitionsPrivate.get('/:id', definitionsCtrl.getEditDefinitions);
definitionsPrivate.get('/eliminar/:id', definitionsCtrl.getDefinitionsDelete);
definitionsPrivate.post('/newDefiniciones', definitionsCtrl.postDefinitionsPrivate);


module.exports = definitionsPrivate;   