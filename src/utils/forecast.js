const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/732c6ed5bfe6e1693e9e22acf1f1d1fa/' + latitude + ',' + longitude + '?units=si&lang=en'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                degree: body.currently.temperature,
                temperature: "It is currently " + body.currently.temperature + "°C out.",
                lowhigh: "This high today is " + body.daily.data[0].temperatureHigh + "°C with a low of " + body.daily.data[0].temperatureLow + "°C.",
                rain: body.currently.precipProbability + "% chance of rain",
                rainingDegree: body.currently.precipProbability,
                windSpeed: body.currently.windSpeed
            })
        }
    })
}

module.exports = forecast