const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const Router = require('./controllers/routes')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

console.log('connecting to', config.DBURL)

mongoose.connect(config.DBURL, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(middleware.requestLogger)
app.use('/api/', Router)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const Updater = require('./controllers/updater')

Updater.updateZones()


//Updater.fetchCharacter({
//    characterName: 'Tyrhalla',
//    serverName: 'argent-dawn',
//    serverRegion: 'EU'
//},'hps').catch((error) => console.log("Error fetchCharacterissa appissa",error))

module.exports = app