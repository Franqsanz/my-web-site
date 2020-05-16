'use strict';

function getHome(req, res) {
    res.cookie('inicio', req.ip, {
        expires: new Date(Date.now() + 100000),
        httpOnly: true
    })
    res.render('index', { titulo: 'Franqsanz' });
}

function getSobreMi(req, res) {
    res.cookie('sobre-mi', req.ip, {
        expires: new Date(Date.now() + 100000),
        httpOnly: true
    })
    res.render('sobre-mi', { titulo: 'Sobre mi - Franqsanz' });
}

function getContact(req, res) {
    res.cookie('contacto', req.body, {
        expires: new Date(Date.now() + 100000),
        httpOnly: true
    })
    res.render('contacto', { titulo: 'Contacto - Franqsanz' });
}

function get404(req, res) {
    res.status(404).render('404', { titulo: 'Error' });
}

function getAll(req, res) {
    res.redirect('/404');
}

module.exports = {
    getHome,
    getSobreMi,
    getContact,
    get404,
    getAll
}