module.exports = (app) => {
    // const newsletter = require('../model/mailNewsletter');

    // GET
    findAllNewsletter = (req, res) => {
        newsletter.find((err, newsletter) => {
            if (!err) res.send(newsletter);
            else console.log('ERROR: ' + err);
        });
    };
    
    // GET 
    findById = (req, res) => {
        newsletter.findById(req.param.id, (err, newsletter) => {
            if (!err) res.send(newsletter);
            else console.log('ERROR: ' + err);
        });
    };

    // POST
    addNewsletter = (req, res) => {
        console.log('POST');
        console.log(req.body);

        let newNewsletter = new newsletter({
            email: req.body.email
        });
        newNewsletter.save();
        res.send(newNewsletter);
    };

    // PUT(Update)
    updateNewsletter = (req, res) => {
        newsletter.findById(req.param.id, (err, newsletter) => {
            newsletter.email = req.body.email;
        });
        newsletter.save();
    };

    // DELETE
    deleteNewsletter = (req, res) => {
        newsletter.findById(req.param.id, (err, newsletter) => {
            newsletter.remove((err) => {
                if (!err) console.log('articulo Borrado');
                else console.log('ERROR: ' + err);
            });
        });
    };

    // API Rotes
    app.get('/newsletter', findAllNewsletter);
    app.get('/newsletter/:id', findById);
    app.post('/newsletter', addNewsletter);
    app.put('/newsletter/:id', updateNewsletter);
    app.delete('/newsletter/:id', deleteNewsletter);
}