console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#error')
const messageTwo = document.querySelector('#summary')
const messageThree = document.querySelector('#temperature')
const messageFour = document.querySelector('#lowhigh')
const messageFive = document.querySelector('#rain')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '
    messageThree.textContent = ' '
    messageFour.textContent = ' '
    messageFive.textContent = ' '

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.summary
                messageThree.textContent = data.temperature
                messageFour.textContent = data.lowhigh
                messageFive.textContent = data.rain
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