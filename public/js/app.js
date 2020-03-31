console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('.find-location')
const search = document.querySelector('#f_elem_city')
const degree = document.querySelector('.num')
const messageOne = document.querySelector('#error')
const messageTwo = document.querySelector('#summary')
const messageThree = document.querySelector('#temperature')
const messageFour = document.querySelector('#lowhigh')
const messageFive = document.querySelector('#rain')
const messageSix = document.querySelector('#location')
const showDiv = document.getElementById("forecastResult")
const showDescription = document.getElementById("description")

var htmlString = "<img src='images/icon-umberella.png' alt=''>"
var htmlString2 = "<img src='images/icon-wind.png' alt=''></img>"
showDiv.style.display = "none";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '
    messageThree.textContent = ' '
    messageFour.textContent = ' '
    messageFive.textContent = ' '
    messageSix.textContent = ' '

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                showDescription.style.display = "block";
                showDiv.style.display = "block";
                messageOne.textContent = ' '
                messageSix.textContent = data.location
                messageTwo.textContent = data.summary
                messageThree.textContent = data.temperature
                messageFour.textContent = data.lowhigh
                messageFive.textContent = data.rain
                degree.textContent = data.degree + "°C"
                document.getElementById("rainingDegree").innerHTML = htmlString + data.rainingDegree + "%"
                document.getElementById("windSpeed").innerHTML = htmlString2 + (data.windSpeed * (5 / 18)).toPrecision(2) + " km/h"
            }
        })
    })

})


jQuery(function () {
    jQuery("#f_elem_city").autocomplete({
        source: function (request, response) {
            jQuery.getJSON(
                "https://secure.geobytes.com/AutoCompleteCity?key=7c756203dbb38590a66e01a5a3e1ad96&callback=?&q=" + request.term,
                function (data) {
                    response(data);
                }
            );
        },
        minLength: 3,
        select: function (event, ui) {
            var selectedObj = ui.item;
            jQuery("#f_elem_city").val(selectedObj.value);
            return false;
        }
    });
    jQuery("#f_elem_city").autocomplete("option", "delay", 100);
});

var myDate = new Date();
var myDay = myDate.getDay();
var myMonth = myDate.getMonth();
var toadysNumber = myDate.getUTCDate();

//Array of months.
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'
    , 'August', 'September', 'October', 'November', 'December'];

// Array of days. 
var weekday = ['Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

var day = weekday[myDay];
var month = months[myMonth];

document.getElementById("day").innerHTML = day
document.getElementById("date").innerHTML = toadysNumber + " " + month
