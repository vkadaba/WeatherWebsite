const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f0e1e000830201bfb6fa5375890a6172&query='+latitude+','+longitude+'&units=f'
    request ({url, json: true},(error,{body}={}) => {
        if(error){
            callback('Unable to connect to Location services', undefined)
        } else if(body.error) {
            callback('Unable to find location!',undefined)
        }else {
            callback(undefined, "It is currently "+body.current.temperature+" out. It feels like "+body.current.feelslike+" degrees out in "+body.location.name)
        }
 
    })

}
module.exports = forecast 