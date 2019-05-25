const express = require('express');
const router = express.Router();

const formidable = require('formidable');
const passport = require('passport');
const fs = require('fs');
//const users = require('../model/user');
const articulos = require('../model/articulos');
//const lluvias = require('../model/precipitaciones');

/*const { API } = require('../API/API');
const fetch = require('node-fetch');
let url = 'http://localhost:8888/api';

fetch(url).then(() => {
    console.log(API);
})

router.get('/api', (req, res) => {
    res.render('api');
})*/

// router
router.get('/', (req, res) => {
    res.render('index', {titulo: 'FranqsanzMedia'})
});

/*router.get('/signin', (req, res) => {res.render('signin')});
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',   
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/register', (req, res) => {res.render('register')});
router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/profile',   
    failureRedirect: '/register',
    passReqToCallback: true
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});*/

// como validar varias rutas despues de haber iniciado sesion o haber cerrado la sesion
/*router.use((req, res, next) => {
    validateAuthenticate(req, res, next);
    next();
});*/

// subir archivos
router.get('/uploadImg', (req, res) => {res.render('uploadImg')});
router.post('/subido', (req, res) => {
    let form = formidable.IncomingForm();

    form.parse(req);
    form.on('fileBegin', (name, file) => {
        file.path = './src/upload/' + file.name;
    }).on('file', ()=>{});
    res.render('subido');
});

// validacion de sesion
/*function validateAuthenticate(req, res, next) {
    if (req.validateAuthenticate()) {
        return next();
    }
    res.redirect('/signin');
}*/

// articulos
router.get('/articulosPrivate/newArticulo', (req, res) => {
    res.render('newArticulo', { titulo: 'Nuevo Articulo | FranqsanzMedia' });
});
router.get('/articulos', (req, res) => {
    articulos.find((err, articulos) => {
        // console.log(estado);
        res.render('articulosPublic', { titulo: 'Articulos | FranqsanzMedia', articulos: articulos });
    });
})
// leer más
/*router.get('/articulos/:id', (req, res) => {
    let tituloArticulos = req.params.id;
    
    articulos.findOne({ _id: tituloArticulos }, (err, articulos) => {
        // console.log(articulos);
        if (err) throw err;
        res.render('leermas', { titulo: 'leer mas', articulos: articulos });
    });
})*/
// fin leer más
router.get('/articulosPrivate', (req, res) => {
    articulos.find((err, articulos) => {
        // console.log(estado);
        res.render('articulos', { titulo: 'Articulos | FranqsanzMedia', articulos: articulos });
    });
});
router.get('/articulosPrivate/editar/:id', (req, res) => {
    let idArticulos = req.params.id;

    articulos.findOne({ _id: idArticulos }, (err, articulos) => {
        // console.log(estado);
        res.render('editArticulo', { titulo: 'Editar Articulo | FranqsanzMedia', articulos: articulos });
    })
});
router.get('/articulosPrivate/eliminar/:id', (req, res) => {
    let idArticulos = req.params.id;

    articulos.remove({ _id: idArticulos }, (err) => {
        res.redirect('/articulosPrivate')
    })
});
router.post('/articulosPrivate', (req, res) => {
    let form = formidable.IncomingForm();

    form.parse(req);
    form.on('fileBegin', (name, file) => {
        file.path = './src/upload/' + file.name;
    }).on('img_article', ()=>{});

    if (req.body.id === "") {
        let newArticulo = new articulos({
            titulo: req.body.titulo,
            cuerpo: req.body.cuerpo,
            img_article: req.body.img_article,
            fuente: req.body.fuente
        });
        newArticulo.save();
    } else {
        articulos.findByIdAndUpdate(req.body.id, { $set: req.body }, { new: true }, ()=>{});
    }
    res.redirect('/articulosPrivate');
});

//contacto
//const newsletter = require('../model/mailNewsletter');

router.get('/contacto', (req, res) => {
    res.render('contacto', { titulo : 'Contacto | FranqsanzMedia' });
});

/*router.post('/newsletter', (req, res) => {
    let mailnewsletter = new newsletter({
        email: req.body.email
    });
    mailnewsletter.save();
    res.redirect('/contacto');
});*/

// lluvias
/*router.get('/profile', (req, res) => {
    lluvias.find((err, lluvias) => {
        // console.log(estado);
        res.render('profile', { titulo: 'lluvias', lluvias: lluvias });
    });
});
router.get('/profile/eliminar/:id', (req, res) => {
    let idLluvias = req.params.id;

    lluvias.remove( { _id: idLluvias }, () => {
        res.redirect('/profile');
    });
});

router.post('/profile', (req, res) => {
    let newLluvia = new lluvias({
        mes: req.body.mes,
        milimetros: req.body.milimetros
    });
    newLluvia.save();
    res.redirect('/profile');
});*/

// 404
router.get('/error', (req, res) => {
    res.render('error', { titulo: 'Error' });
});
router.get('*', (req, res) => {
   res.redirect('/error');
});

module.exports = router;