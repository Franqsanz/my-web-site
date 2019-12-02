'use strict';

const express = require('express');
const viewsStaticCtrl = require('../controllers/routerStatic');
const definitionsCtrl = require('../controllers/definitions');
const router = express.Router();

router.get('/', viewsStaticCtrl.getHome);
// sobre mi
router.get('/sobre-mi', viewsStaticCtrl.getSobreMi);
//definiciones todo
router.get('/blog', definitionsCtrl.getDefinitions);
router.get('/blog/:id', definitionsCtrl.getDefinitionsOne);
// contacto
router.get('/contacto', viewsStaticCtrl.getContact);
router.post('/contacto', viewsStaticCtrl.postContact);

module.exports = router