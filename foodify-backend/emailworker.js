const axios = require('axios')
const nodemailer = require('nodemailer')

// const baseUrl = '/api/users'
const baseUrl = 'https://murmuring-harbor-82413.herokuapp.com/api/users'

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

const createMailOptions = (groceries, email) => {
    const parsedGroceries = []
    for(let i = 0; i < groceries.length; i++){
        parsedGroceries.push(` ${groceries[i].name}`)
    }
    return {
        from: 'foodify.automated@outlook.com',
        to: email,
        subject: '🌱 Your groceries need your attention!',
        text: `Your ${parsedGroceries.toString()} are getting old!`
    }
}

// Get all users and their groceries
const getUsersGroceries = async () => {
    try {
        const response = await axios.get(baseUrl)
        parseUsers(response.data)
    } catch (error) {
        console.error(error);
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

const parseUsers = async (data) => {
    const todayDate = new Date()
    for(let i = 0; i < data.length; i++){
        // find users whose groceries are 3+ days old
        const expiredGroceries = []
        for(let j = 0; j < data[i].groceries.length; j++){
            // add to expiration date and compare to today's date
            const expirationDate = new Date(data[i].groceries[j].expiration);
            const addedExpirationDate = addDays(expirationDate, 3)

            if(todayDate > addedExpirationDate){
                expiredGroceries.push(data[i].groceries[j])
            }
        }

        // Send email to users who have "older" groceries
        if(expiredGroceries.length > 0) {
            setTimeout(function () {
                const mailOptions = createMailOptions(expiredGroceries, data[i].email)
                sendMail(mailOptions)
            }, 500);
        }
    }
}

const addDays = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

getUsersGroceries();
