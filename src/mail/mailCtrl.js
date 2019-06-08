const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 465,
    auth: {
        user: 'francogenta8@gmail.com',
        pass: 'DesarrolloWeb'
    },

    tls: {
        rejectUnauthorized: false
    }
});

// let helper =  {
//     from: '"franqsanz"',
//     to: 'francogenta8@gmail.com',
//     subject: 'hola gmail',
//     text: 'wow nodemailer'
// };

// transport.sendMail(helper, (err, info) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log('mensaje enviado');
//     console.log(info);
// });

module.exports = transport;