'use strict';

const upload = require('./uploadCtrl');
const definiciones = require('../model/definiciones');

function getDefinitions(req, res) {
    let mensajeError = '', mensajeOk = '';
    if (req.query.search) {
        //console.log(req.query.search)
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');

        definiciones.find({ titulo: regex }, (err, definiciones) => {
            //console.log(definiciones);
            if (definiciones.length < 1) {
                mensajeError = `No se encontro resultado sobre: ${req.query.search}`;
            } else {
                mensajeOk = `Resultados de la búsqueda de: ${req.query.search}`;
            }
            res.render('definiciones_Public',
                {
                    titulo: 'Definiciones | FranqsanzDev',
                    definiciones: definiciones,
                    mensajeError: mensajeError,
                    mensajeOk: mensajeOk,
                    titulo: `Has Buscado ${req.query.search}`
                });
        }).sort({ _id: -1 });
    } else {
        definiciones.find({}, (err, definiciones) => {
            //console.log(definiciones);
            res.render('definiciones_Public',
                {
                    titulo: 'Definiciones | FranqsanzDev',
                    definiciones: definiciones
                });
        }).sort({ _id: -1 });
    }
    res.cookie('busqueda ', req.query.search, { expires: new Date(Date.now() + 100000) })
}
// expresion regular para el search
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function getEditDefinitions(req, res) {
    let idDefiniciones = req.params.id;

    definiciones.findOne({ _id: idDefiniciones }, (err, definiciones) => {
        // console.log(estado);
        res.render('editDefiniciones',
            {
                titulo: 'Editar Definiciones | FranqsanzDev',
                definiciones: definiciones
            });
    })
}

function getNewDefinitions(req, res) {
    res.render('newDefiniciones', { titulo: 'Nuevo Defeniciones | FranqsanzDev' });
}

function getDefinitionsPrivate(req, res) {
    definiciones.find((err, definiciones) => {
        // console.log(estado);
        res.render('definiciones', { titulo: 'Definiciones Private | FranqsanzDev', definiciones: definiciones });
    }).sort({ _id: -1 });
}

// post de las definiciones al la DB y upload de archivos
function postDefinitionsPrivate(req, res) {
    upload(req, res, (err) => {
        if (err) {
            res.status(500).send('error ' + err)
        } else {
            if (req.file == undefined) {
                res.render('newDefiniciones', {
                    msj: 'No hay ninguna seleccion'
                })
                res.send('no hay seleccion')
            } else {
                let newDefinicion = new definiciones({
                    titulo: req.body.titulo,
                    cuerpo: req.body.cuerpo,
                    img: req.file.filename,
                    fuente: req.body.fuente
                });

                newDefinicion.save(() => {
                    res.redirect('/definiciones-private');
                })
            }
        }
    })
}

function getDefinitionsDelete(req, res) {
    let idDefiniciones = req.params.id;

    definiciones.remove({ _id: idDefiniciones }, (err) => {
        res.redirect('/definiciones-private')
    })
}

module.exports = {
    getDefinitions,
    getEditDefinitions,
    getNewDefinitions,
    getDefinitionsPrivate,
    postDefinitionsPrivate,
    getDefinitionsDelete
}