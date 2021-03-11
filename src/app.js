//Importing Necessary Modules
const express = require('express')
const hbs = require('hbs')
const path = require('path')
// const WebSocket = require('Websocket')
// const finnhub = require('finnhub')

const { stockCandles } = require('./utils/finnhubFunctions')


const app = express()
const port = process.env.PORT || 3000

// Finnhub Api-Key
// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "c0g00d748v6rp6j6ei0g"
// const finnhub_api_key = "c0g00d748v6rp6j6ei0g"

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static Directory Path
app.use(express.static(publicDirectoryPath))

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    stockCandles('AAPL', (error, result) => {
        if(error){
            return console.log(error)
        }

        console.log(result)
        res.render('index', {
            result: result
        })
    })
})

app.get('/companydetails', (req, res) => {
    if(!req.query.symbol){
        return res.send({
            error: 'You must provide a symbol'
        })
    }

    res.render('companydetails', {
        symbol: req.query.symbol
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})
