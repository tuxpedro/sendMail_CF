const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: false })

const url = "smtps://<EMAIL>%40gmail.com:" + encodeURIComponent('<PASSWD>') + "@smtp.gmail.com:465";
const transporter = nodemailer.createTransport(url);

exports.enviarEmail = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        
        const { subject, text, html } = JSON.parse(request.body)
        const to = 'pedros.pedra@gmail.com'
        const from = '"<DESCRITIVE_NAME>" <<EMAIL>@gmail.com>'
        const email = { from, subject, to, text, html }

        transporter.sendMail(email, (err, info) => {
            if (err) {
                return console.log(err)
            }
            response.status(200).send(`'Mensagem ${info.messageId}, enviada: ${info.response}`)
        })
    })
});
