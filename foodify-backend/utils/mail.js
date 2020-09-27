const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'foodify.automated@outlook.com',
        pass: 'F00disGr8!'
    }
})

transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: '../foodify-backend/views/',
}))

const createMailOptions = (email) => {
    return {
        from: 'foodify.automated@outlook.com',
        to: email,
        subject: 'Welcome to foodify! 🎉',
        template: 'welcome'
    }
}

const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, function(error, info) {
        if(error){
            console.log(error)
        } else {
            console.log('Email sent!', info.response)
        }
    })
}

module.exports = {
    createMailOptions, sendMail
}