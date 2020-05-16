'use strict';

const router = require('express').Router();
const {
    getHome,
    getSobreMi,
    getContact
} = require('../controllers/routerStatic');

router.get('/', getHome);
router.get('/sobre-mi', getSobreMi);
router.get('/contacto', getContact);

module.exports = router