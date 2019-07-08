const express = require('express');
const router = express.Router();

const formidable = require('express-formidable');
//const fs = require('fs');

const articulos = require('../model/articulos');
const email = require('../mail/mailCtrl');

// router
router.get('/', (req, res) => {
    res.cookie('inicio', req.ip)
    res.render('index', {titulo: 'FranqsanzMedia'});
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
router.get('/definiciones', (req, res) => {
    let mensajeError = '';
    let mensajeOk = '';
    if (req.query.search) {
        //console.log(req.query.search)
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');

        articulos.find({titulo: regex}, (err, articulos) => {
            //console.log(articulos);
            if (articulos.length < 1) {
                mensajeError = `No se encontro resultado sobre: ${req.query.search}`;
            } else {
                mensajeOk = `Resultados de la búsqueda de: ${req.query.search}`;
            }
            res.render('articulosPublic', { titulo: 'Articulos | FranqsanzMedia', articulos: articulos, mensajeError: mensajeError, mensajeOk: mensajeOk, titulo: `Has Buscado ${req.query.search}` });
        }).sort({ _id: -1 });  
    } else {
        articulos.find({}, (err, articulos) => {
            //console.log(articulos);
            res.render('articulosPublic', { titulo: 'Articulos | FranqsanzMedia', articulos: articulos });
        }).sort({ _id: -1 }); 
    }
    res.cookie('busqueda ', req.query.search, {expires: new Date(Date.now() + 100000)})
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// leer más
/*router.get('/articulos/:titulo', (req, res) => {
    let tituloArticulos = req.params.titulo;
    
    articulos.findOne({ titulo: tituloArticulos }, (err, articulos) => {
        //console.log(articulos);
        if (err) throw err;
        res.render('post', { titulo: req.params.titulo, articulos: articulos });
    });
});*/
// fin leer más

router.get('/articulosPrivate', (req, res) => {
    articulos.find((err, articulos) => {
        // console.log(estado);
        res.render('articulos', { titulo: 'ArticulosPrivate | FranqsanzMedia', articulos: articulos });
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
    res.cookie('contacto', req.body, {expires: new Date(Date.now() + 100000)})
    res.render('contacto', { titulo : 'Contacto | FranqsanzMedia' });
});
router.post('/contacto', (req, res) => {
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
    /*let bienMail = `Gracias "${req.body.nombre}" por tu contacto, tu correo se a enviado correctamente.`;
    res.render('contacto-ok', { titulo: 'Correo Enviado', bienMail: bienMail });*/
});

// 404
router.get('/404', (req, res) => {
    res.render('404', { titulo: 'Error' });
});
router.all('*', (req, res) => {
   res.redirect('/404');
});

module.exports = router;