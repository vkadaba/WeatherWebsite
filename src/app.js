const path = require('path')
const hbs = require('hbs')
const express = require('express')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000


//Defining paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//sSetup static document to serve
app.use(express.static(publicDirectoryPath))
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Vishnu'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About the tool',
        name: 'Vishnu'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Vishnu',
        message: 'welp nothing I can do innit'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
            title: '404',
            errorMessage: 'Help article not found!',
            name: 'Vishnu'
    })
    
})

// app.get('/products' , (req,res )  => {
//     if(!req.query.search) {  
//        return res.send({
//             error: 'You must provide a search term!'
//         })
//     }
//     res.send({
//         products: []
//     })
// })


app.get('/weather' , (req,res )  => {
    if(!req.query.address) {
        res.send({
            error: 'You must provide an address!'
        })
    }else {
        geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
            if(error) {
               return res.send({
                   error: error
                })
            }
            forecast(latitude,longitude, (error , forecastData) => {
                if(error) {
                   res.send({
                       error: error
                   })      
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
                
            })
        })
    }
    
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'No related web link found! ',
        name: 'Vishnu'
})
})


app.listen(port, () => {
    console.log('Server is up on port' + port )

})
