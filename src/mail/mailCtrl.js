'use strict'

const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 465,
    auth: {
        user: 'francogenta8@gmail.com',
        pass: process.env.PASS_MAIL
    },

    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transport;