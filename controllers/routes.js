const Router = require('express').Router()
const Zone = require('../models/zone')
const Character = require('../models/character')
const Updater = require('./updater')

Router.get('/characters/', (request, response) => {
    Character.find({}).then(array => {
        response.json(array.map(e => e.toJSON()))
    })
})
Router.post('/characters/', async (request, response, next) => {
    await Updater.fetchCharacter(request.body)
        .catch(error => response.status(400).write(error.toString()))
    response.status(200).end()
})
Router.get('/Characters/:id', (request, response, next) => {
    Character.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})
Router.get('/zones/', (request, response) => {
    console.log("get zones called")
    Zone.find({}).then(array => {
        response.json(array.map(e => e.toJSON()))
    })
})
Router.post('/zones/', (request, response) => {
    Updater.updateZones()
    response.status(200).end()
})

module.exports = Router