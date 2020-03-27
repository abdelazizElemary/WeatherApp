const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/732c6ed5bfe6e1693e9e22acf1f1d1fa/' + latitude + ',' + longitude + '?units=si&lang=en'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + "°C out. This high today is " + body.daily.data[0].temperatureHigh + "°C with a low of " + body.daily.data[0].temperatureLow + "°C. There is a " + body.currently.precipProbability + "% chance of rain")
        }
    })
}

module.exports = forecast