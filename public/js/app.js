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