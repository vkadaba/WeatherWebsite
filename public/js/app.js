

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

messageOne.textContent = ' '
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value 
    messageOne.textContent=' Loading address forecast info! '
    messageTwo.textContent=' '

    fetch('http://localhost:3000/weather?address='+location).then((response)=> {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent=('Error in fetching location ' + data.error)
            } else {
                messageOne.textContent=('Location: '+data.location) 
                messageTwo.textContent= ('Forecast: '+data.forecast)
                
            }
        })
    })

    //console.log(location)
})