const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const fs = require('fs');
const email= JSON.parse(fs.readFileSync('./mail.json', 'utf8')).user;
const password= JSON.parse(fs.readFileSync('./mail.json', 'utf8')).pass;
const client_id= JSON.parse(fs.readFileSync('./mail.json', 'utf8')).clientId;
const client_secret= JSON.parse(fs.readFileSync('./mail.json', 'utf8')).clientSecret;

const unqfymodule= require('./unqfy');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com', // server para enviar mail desde gmail
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: email,
        pass: password,
        clientId: client_id,
        clientSecret: client_secret,
    },

});
// setup email data with unicode symbols
const mailOptions = {
from: '"Subscription Service" '+'<'+email+'>', // sender address
to: 's.mariel.lopez1995@gmail.com', // list of receivers
subject: 'Un nuevo album de tu artista favotito ha sido agregado, ¿que esperas para escucharlo?',
text: 'Entra y se el primero en escuchar el nuevo album de tu artista favorito', // plain text body
html: '<b>Entra y se el primero en escuchar el nuevo album de tu artista favorito</b>' // html body
};
// enviando mail con callbacks
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } 
    else {
        console.log(info);
    }
});