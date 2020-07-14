const request = require('request')


const geocode = (address,callback) => {
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmthZGFiYSIsImEiOiJja2NnaDdtM3IwMDN5MnVvZXRnM3ZtNjRhIn0.zZUVNQJsz9g5AE3jkLpyVg&limit=1'
    request ({url: url2,json:true},(error,{body}={}) => {
        if(error) {
            callback('Unable to connect to Location services',undefined)
        }else if(body.features.length===0) {
            callback('Unable to find location. Try another search',undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode