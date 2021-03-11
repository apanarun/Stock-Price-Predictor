//Importing Necessary Modules
const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

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
    res.render('index')
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})