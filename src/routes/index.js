const express = require('express');
const router = express.Router();

const formidable = require('formidable');
const passport = require('passport');
const fs = require('fs');
const fetch = require('node-fetch');

const articulos = require('../model/articulos');
const email = require('../mail/mailCtrl');
const newsletter = require('../model/mailNewsletter');

// router
router.get('/', (req, res) => {
    res.render('index', {titulo: 'FranqsanzMedia'})
});

// subir archivos
/*router.get('/uploadImg', (req, res) => {res.render('uploadImg')});
router.post('/subido', (req, res) => {
    let form = formidable.IncomingForm();

    form.parse(req);
    form.on('fileBegin', (name, file) => {
        file.path = './src/upload/' + file.name;
    }).on('file', ()=>{});
    res.render('subido');
});*/

// articulos
router.get('/articulosPrivate/newArticulo', (req, res) => {
    res.render('newArticulo', { titulo: 'Nuevo Articulo | FranqsanzMedia' });
});
router.get('/articulos', (req, res) => {
    articulos.find((err, articulos) => {
        // console.log(articulos);
        res.render('articulosPublic', { titulo: 'Articulos | FranqsanzMedia', articulos: articulos });
    }).sort({ _id: -1 });
})
// leer más
/*router.get('/:id', (req, res) => {
    let tituloArticulos = req.params.id;
    
    articulos.findOne({ _id: tituloArticulos }, (err, articulos) => {
        //console.log(articulos);
        if (err) throw err;
        res.render('leermas', { titulo: 'leer mas', articulos: articulos });
    });
});*/
// fin leer más
router.get('/articulosPrivate', (req, res) => {
    articulos.find((err, articulos) => {
        // console.log(estado);
        res.render('articulos', { titulo: 'Articulos | FranqsanzMedia', articulos: articulos });
    }).sort({_id: -1});
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
    
    let form = formidable.IncomingForm();

    form.parse(req);
    form.on('fileBegin', (name, file) => {
        file.path = './src/views/public/upload/' + file.name;
    }).on('img_article', ()=>{});

    res.redirect('/articulosPrivate');
});

//contacto
router.get('/contacto', (req, res) => {
    res.render('contacto', { titulo : 'Contacto | FranqsanzMedia' });
});
// router.post('/contacto', (req, res) => {
//     res.render('contacto', { data: req.body });
// });
router.post('/contacto', (req, res) => {
    console.log(req.body);
    let helper = {
        from: req.body.email,
        to: 'francogenta8@gmail.com',
        subject: req.body.asunto,
        html: `
            <div>
                <p>Nombre: ${req.body.nombre}</p>
                <p>E-mail: ${req.body.email}</p>
                <p>Asunto: ${req.body.asunto}</p>
                <p>Mensaje: ${req.body.msj}</p>
            </div>
        `
    }
    email.sendMail(helper, (err, info) => {
        if (err) {
            return console.log(err);
        }
        console.log(info);
    });
    res.send('enviado')
});
router.get('/newsletter', (req, res) => {
    res.send('hola newsletter');
});

// 404
router.get('/error', (req, res) => {
    res.render('error', { titulo: 'Error' });
});
router.all('*', (req, res) => {
   res.redirect('/error');
});

module.exports = router;