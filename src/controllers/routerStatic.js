'use strict';

const email = require('../mail/mailCtrl');

function getHome(req, res) {
    res.cookie('inicio', req.ip, {
        expires: new Date(Date.now() + 100000), 
        httpOnly: true,
    })
    res.render('index', {titulo: 'FranqsanzDev'});
}

function getSobreMi(req, res) {
    res.cookie('sobre-mi', req.ip, {expires: new Date(Date.now() + 100000), httpOnly: true})    
    res.render('sobre-mi', { titulo: 'Sobre mi | FranqsanzDev' });
}

function getContact(req, res) {
    res.cookie('contacto', req.body, {expires: new Date(Date.now() + 100000), httpOnly: true })
    res.render('contacto', { titulo : 'Contacto | FranqsanzDev' });
}

function postContact(req, res) {
    let helper = {
        from: req.body.email,
        to: 'francogenta8@gmail.com',
        subject: req.body.asunto,
        html: `
            <div>
                <p>Nombre: ${req.body.nombre}</p>
                <p>E-mail: ${req.body.email}</p>
                <p>Asunto: ${req.body.asunto}</p>
                <h3>Mensaje: ${req.body.msj}</h3>
            </div>
        `
    }
    email.sendMail(helper, (err, info) => {
        let errorMail = 'No se a podido enviar el mail, por favor vuelvalo a intentar.';
        if (err) {
            res.render('contacto-ok', { titulo: 'Error al enviar el mail', errorMail: errorMail });
            return console.log(err);
        }
        //console.log(info);
        let bienMail = `Gracias "${req.body.nombre}" por tu contacto, tu correo se a enviado correctamente.`;
        res.render('contacto-ok', { titulo: 'Correo Enviado', bienMail: bienMail });
    });
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
    postContact,
    get404,
    getAll
}