const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast',
        name: 'Abdelaziz Elemary'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abdelaziz Elemary'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        text: 'Follow my github repo and ask me if you need any help',
        name: 'Abdelaziz Elemary'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address first'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        text: 'Help article not found.',
        name: 'Abdelaziz Elemary'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        text: 'Page Not Found',
        name: 'Abdelaziz Elemary'
    })
})

app.listen(port, (req, res) => {
    console.log('Server is listening on port '+ port)
})