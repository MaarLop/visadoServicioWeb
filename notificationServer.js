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
let x= ['s.mariel.lopez1995@gmail.com', 'mar_070195@hotmail.com']

function send (subject,message,lista){
    const mailOptions = {
        from: '"Subscription Service" '+'<'+email+'>', // sender address
        to: lista,
        subject: subject,
        text: message, // plain text body
        html: '<b>'+message+'</b>' // html body
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } 
            else {
                console.log(info);
            }
        });
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } 
            else {
                console.log(info);
            }
        });
    }



module.exports={
    send
}